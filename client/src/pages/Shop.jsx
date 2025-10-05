import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Search, Heart, ShoppingCart, CreditCard } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;

const Shop = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 6;

  // ✅ Fetch Categories (from backend)
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load categories");
    }
  };

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams({
        category,
        sort: sortBy,
        page,
        limit: perPage,
        search,
      }).toString();

      const res = await fetch(`${API_URL}/products?${query}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      setProducts(data.products);
      setTotalPages(data.totalPages);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to fetch products", err);
      toast.error("❌ Failed to load products");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [category, sortBy, page, search]);

  // ✅ Add to Wishlist
  const handleWishlist = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ Please login first to add to wishlist!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (!res.ok) throw new Error("Failed to add to wishlist");

      window.dispatchEvent(new Event("wishlistUpdated"));
      toast.success("💖 Item added to wishlist!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add item to wishlist!");
    }
  };

  // ✅ Add to Cart
  const handleAddToCart = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("⚠️ Please login first");
        return;
      }

      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, qty: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("🛒 Item added to cart!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add item to cart!");
    }
  };

  // ✅ Buy Now (Add to Cart + Redirect)
  const handleBuyNow = async (id) => {
    await handleAddToCart(id);
    const token = localStorage.getItem("token");
    if (token) navigate("/cart");
  };

  // ✅ Go to Product Detail
  const goToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="container px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Shop Products</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:justify-between mb-6 gap-4 relative">
          {/* Search */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 text-[#C9B77A] -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-2 py-2 rounded w-full text-[#C9B77A] border focus:outline-none focus:ring-2 focus:ring-[#FFB84C]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category */}
          <select
            className="p-2 rounded w-full md:w-1/4 text-[#C9B77A] border bg-black"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            className="p-2 rounded w-full md:w-1/4 text-[#C9B77A] border bg-black"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const discount = product.originalPrice
              ? Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                )
              : 0;

            return (
              <div
                key={product._id}
                className="relative bg-[#1A1D23] p-4 rounded shadow text-white cursor-pointer"
                onClick={() => goToDetail(product._id)} // ✅ navigate on click
              >
                {/* Discount Badge */}
                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 px-2 py-1 text-xs rounded">
                    {discount}% OFF
                  </span>
                )}

                {/* Wishlist */}
                <Heart
                  className="absolute top-2 right-2 cursor-pointer hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                />

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-100 object-cover rounded mb-2"
                />

                <h3 className="font-semibold hover:text-[#FFB84C]">{product.title}</h3>
                <p className="text-sm text-gray-400">{product.category}</p>

                {/* Price */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-baseline gap-2">
                    {product.originalPrice && (
                      <p className="text-sm text-gray-400 line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                    <p className="font-bold text-[#FFB84C]">${product.price}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3">
                  <Button
                    variant="vintage"
                    size="sm"
                    className="flex items-center gap-1 flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product._id);
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" /> Add
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyNow(product._id);
                    }}
                  >
                    <CreditCard className="h-4 w-4" /> Buy
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={page === i + 1 ? "vintage" : "outline"}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
