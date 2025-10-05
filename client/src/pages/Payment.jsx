import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();

  // Dummy cart data
  const [items] = useState([
    { id: 1, title: "Vintage Leather Jacket", price: 45, quantity: 1 },
    { id: 2, title: "Retro Sneakers", price: 60, quantity: 2 },
  ]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handlePay = () => {
    // Demo payment simulation
    alert("Payment successful!");
    navigate("/payment-success");
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#FFB249] mb-8">
          Payment
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Card */}
          <section className="lg:col-span-2 space-y-4">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 shadow-lg space-y-4">
              <h2 className="text-xl font-semibold">Pay with Card</h2>
              <p className="text-gray-400 text-sm">
                Click "Pay Now" to simulate payment success.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handlePay}
                  className="px-6 py-2 bg-[#FFB249] text-black font-semibold rounded-md hover:bg-[#FF9233] transition"
                >
                  Pay Now
                </button>
                <button
                  onClick={() => navigate("/checkout")}
                  className="px-6 py-2 border border-gray-600 rounded-md hover:bg-gray-800 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </section>

          {/* Order Summary */}
          <aside className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 shadow-lg h-fit space-y-3">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="truncate mr-2">{i.title} × {i.quantity}</span>
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
      </div>
    </div>
  );
};

export default Payment;
