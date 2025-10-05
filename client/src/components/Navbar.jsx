// src/components/Header.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, User, ShoppingCart, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) =>
    location.pathname === path ? "text-[#FFB249]" : "text-white hover:text-[#FFB249]";

  // Get user from localStorage
  const checkUser = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  };

  const updateCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setCartCount(0);

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setCartCount(data.items?.length || 0);
    } catch (err) {
      setCartCount(0);
    }
  };

  const updateWishlistCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setWishlistCount(0);

    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setWishlistCount(data.items?.length || 0);
    } catch (err) {
      setWishlistCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    setWishlistCount(0);
    setCartCount(0);
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  // Initial load & event listeners
  useEffect(() => {
    checkUser();
    updateCartCount();
    updateWishlistCount();

    const handleCartUpdate = () => updateCartCount();
    const handleWishlistUpdate = () => updateWishlistCount();
    const handleLoginEvent = () => checkUser(); // listen for login event

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("wishlistUpdated", handleWishlistUpdate);
    window.addEventListener("login", handleLoginEvent); // ✅ crucial

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("wishlistUpdated", handleWishlistUpdate);
      window.removeEventListener("login", handleLoginEvent);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#111111]/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Left - Logo & Nav */}
        <div className="flex items-center space-x-8">
          <Link className="flex items-center space-x-2" to="/">
            <ShoppingBag className="h-8 w-8 text-[#FFB249]" />
            <span className="font-bold text-[#FFB249] text-lg">ThriftHub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/shop" className={`font-medium transition-colors ${isActive("/shop")}`}>
              Shop
            </Link>
            {user?.isAdmin && (
              <Link
                to="/admin"
                className={`font-medium transition-colors ${isActive("/admin")}`}
              >
                Admin
              </Link>
            )}
          </nav>
        </div>

        {/* Right - Search, User, Cart, Wishlist */}
        <div className="flex items-center space-x-4 relative">
          <div className="relative hidden md:block w-[400px] lg:w-[500px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for vintage treasures..."
              className="w-full rounded-md bg-[#1a1a1a] border border-gray-700 pl-10 pr-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FFB249]"
            />
          </div>

          <nav className="flex items-center space-x-3">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => (!user ? navigate("/login") : setDropdownOpen(!dropdownOpen))}
                className="p-3 rounded-full hover:bg-[#FFB249] cursor-pointer"
              >
                <User className="h-5 w-5 text-white" />
              </button>
              {user && dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1d23] border border-gray-700 rounded-lg shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-white hover:bg-[#FFB249]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-white hover:bg-[#FFB249]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#FF4C4C]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link to="/cart" className="relative p-3 rounded-full hover:bg-[#FFB249] cursor-pointer">
              <ShoppingCart className="h-5 w-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 bg-[#FFB249] text-black text-xs font-bold px-1 rounded-full">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            <Link to="/wishlist" className="relative p-3 rounded-full hover:bg-[#FF4C4C] cursor-pointer">
              <Heart className="h-5 w-5 text-white" />
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 bg-[#FF4C4C] text-white text-xs font-bold px-1 rounded-full">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            <button className="p-3 rounded-full md:hidden hover:bg-[#1a1a1a]">
              <Menu className="h-5 w-5 text-white" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
