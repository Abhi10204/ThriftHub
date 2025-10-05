import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;
const CART_API = `${API_URL}/cart`;

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setCartItems([]);
        return;
      }

      const res = await fetch(CART_API, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      const safeItems = (data?.items || []).filter((i) => i?.product);
      setCartItems(safeItems);

      // Update cart count in header
      localStorage.setItem("cart", JSON.stringify(safeItems));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Failed to load cart", err);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, type) => {
    const item = cartItems.find((i) => i?.product?._id === id);
    if (!item) return;

    if (type === "decrease" && item.qty === 1) return removeItem(id);

    try {
      const token = localStorage.getItem("token");
      await fetch(`${CART_API}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          qty: type === "increase" ? 1 : -1,
        }),
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to update qty", err);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${CART_API}/remove/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const clearCart = async () => {
    for (const item of cartItems) {
      if (item?.product?._id) await removeItem(item.product._id);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.qty || 0),
    0
  );

  return (
    <section className="min-h-screen bg-[#111111] text-white py-3">
      <div className="container mx-auto px-4">
        <div
          className="flex items-center gap-4 mb-8 cursor-pointer"
          onClick={() => navigate("/shop")}
        >
          <ArrowLeft className="h-5 w-5 text-[#FFB249]" />
          <span className="text-[#FFB249] hover:underline">Continue Shopping</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[#FFB249] mb-8">
          Your Cart
        </h1>

        {loading ? (
          <p className="text-gray-400">Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-[#1a1a1a] rounded-xl">
            <ShoppingCart className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-gray-400 mb-4">Your cart is empty.</p>
            <button
              onClick={() => navigate("/shop")}
              className="px-6 py-2 bg-[#FFB249] text-black font-semibold rounded-md hover:bg-[#FF9233] transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(
                (item) =>
                  item?.product && (
                    <div
                      key={item.product._id}
                      className="flex items-center gap-4 bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h2 className="font-semibold truncate">{item.product.title}</h2>
                        <p className="text-[#FFB249] font-bold">
                          ${item.product.price.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product._id, "decrease")}
                            className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-6 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQuantity(item.product._id, "increase")}
                            className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 transition"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 font-semibold">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="ml-2 p-1 hover:bg-red-800 rounded"
                      >
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  )
              )}

              <div className="flex justify-between">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 flex items-center gap-2 transition"
                >
                  <Trash2 className="h-4 w-4" /> Clear Cart
                </button>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-[#FFB249]">Free</span>
              </div>
              <hr className="border-gray-700" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full py-3 bg-[#FFB249] text-black font-semibold rounded-md hover:bg-[#FF9233] transition"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
