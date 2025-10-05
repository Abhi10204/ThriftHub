// src/pages/Checkout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const Checkout = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const [items] = useState([
    { id: 1, title: "Vintage Leather Jacket", price: 45, quantity: 1 },
    { id: 2, title: "Retro Sneakers", price: 60, quantity: 2 },
  ]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Fetch logged-in user email
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUserEmail(data.user.email);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        toast.error("Failed to fetch user info");
      }
    };

    fetchUser();
  }, []);

  // Handle shipping input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;

    // Only allow digits for ZIP
    if (name === "zip") val = val.replace(/\D/g, "");

    setShipping({ ...shipping, [name]: val });
  };

  // Submit order
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to place an order");
        return;
      }

      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          contact: { email: userEmail, phone },
          total: subtotal,
          shipping,
        }),
      });

      if (res.ok) {
        toast.success("Order placed successfully!");
        navigate("/payment");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Header */}
      <header className="bg-[#1a1a1a] border-b border-gray-800 p-6">
        <h1 className="text-3xl font-bold text-[#FFB249]">Checkout</h1>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-2 bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 space-y-8 shadow-lg"
          >
            {/* Contact */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact</h2>
              <input
                type="email"
                name="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249] mb-4"
              />
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                placeholder="Phone Number"
                required
                className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
              />
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  required
                  onChange={handleChange}
                  className="md:col-span-2 w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
                />
                <input
                  type="number"
                  name="zip"
                  placeholder="ZIP"
                  maxLength={6}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-[#111] border border-gray-700 text-white focus:ring-2 focus:ring-[#FFB249]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <Link
                to="/cart"
                className="px-6 py-2 rounded-md border border-gray-600 hover:bg-gray-800 transition"
              >
                Back to Cart
              </Link>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-[#FFB249] text-black font-semibold hover:bg-[#FF9233] transition"
              >
                Continue to Payment
              </button>
            </div>
          </form>

          {/* Order Summary */}
          <aside className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 shadow-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {items.map((i) => (
              <div
                key={i.id}
                className="flex items-center justify-between text-sm mb-2"
              >
                <span className="truncate mr-2">
                  {i.title} × {i.quantity}
                </span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 my-4"></div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
