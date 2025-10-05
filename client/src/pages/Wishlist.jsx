import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setWishlist([]);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const data = await res.json();
      setWishlist(Array.isArray(data.items) ? data.items : []);
      window.dispatchEvent(new CustomEvent("wishlistUpdated"));
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setWishlist([]); // fallback
      toast.error("❌ Failed to load wishlist!");
    }
  };

  useEffect(() => {
    fetchWishlist();

    const handleUpdate = () => fetchWishlist();

    window.addEventListener("storage", handleUpdate);
    window.addEventListener("wishlistUpdated", handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("wishlistUpdated", handleUpdate);
    };
  }, []);

  // Remove single item
  const removeFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_URL}/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      fetchWishlist();
      toast.success("🗑️ Item removed from wishlist");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to remove item");
    }
  };

  // Add item to cart
  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("⚠️ Please login first!");

    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, qty: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      window.dispatchEvent(new CustomEvent("cartUpdated"));
      removeFromWishlist(product._id);
      toast.success("🛒 Item moved to cart!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add to cart");
    }
  };

  // Clear all wishlist
  const clearWishlist = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("⚠️ Please login first!");

    try {
      await Promise.all(
        wishlist.map((item) =>
          fetch(`${API_URL}/wishlist/remove/${item?.product?._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      fetchWishlist();
      toast.success("🗑️ Wishlist cleared!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to clear wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] py-8">
      <div className="container px-4 mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 bg-[#1a1a1a] rounded-xl">
            <Heart className="h-12 w-12 mb-4 text-gray-400" />
            <p className="text-gray-400 mb-4">Your wishlist is empty.</p>
            <Button
              onClick={() => navigate("/shop")}
              className="px-6 py-2 bg-[#FFB249] text-black font-semibold rounded-md hover:bg-[#FF9233] transition"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-4">
              <Button
                onClick={clearWishlist}
                className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" /> Clear Wishlist
              </Button>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((item) => {
                const product = item?.product;
                if (!product) return null;

                const discount = product.originalPrice
                  ? Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )
                  : 0;

                return (
                  <div
                    key={product._id}
                    className="relative bg-[#1A1D23] p-4 rounded shadow text-white hover:shadow-lg transition"
                  >
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-red-500 px-2 py-1 text-xs rounded">
                        {discount}% OFF
                      </span>
                    )}

                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.title}
                      className="w-full h-64 object-cover rounded mb-2"
                    />

                    <h3 className="font-semibold hover:text-[#FFB84C]">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-400">{product.category}</p>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-baseline gap-2">
                        {product.originalPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            ${product.originalPrice}
                          </p>
                        )}
                        <p className="font-bold text-[#FFB84C]">
                          ${product.price}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="vintage"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => addToCart(product)}
                        >
                          <ShoppingCart className="h-4 w-4" /> Add to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFromWishlist(product._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
