// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import Header from "./components/Navbar";
import Footer from "./components/Footer";


// Pages
import HeroPage from "./pages/HeroPage";
import Categories from "./pages/Categories";
import FeaturedProducts from "./pages/FeaturedProducts";
import Newsletter from "./pages/Newsletter";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";

// Admin Pages
import AdminNavbar from "./admin/AdminNavbar";
import AdminDashboard from "./admin/AdminDashboard";
import ProductList from "./admin/ProductList";
import ProductForm from "./admin/ProductForm";
import CategoryManager from "./admin/CategoryManager";
import ProtectedRoute from "./components/ProtectedRoute";

function AppLayout() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // Show admin navbar only if logged in and on an /admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {isAdminRoute && user?.isAdmin ? <AdminNavbar /> : <Header />}

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <HeroPage />
              <Categories />
              <FeaturedProducts />
              <Newsletter />
            </>
          }
        />

        {/* Shop */}
        <Route path="/shop" element={<Shop />} />

        {/* product detail */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Cart & Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />

        {/* ------------------- Admin Pages ------------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <ProductForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute requiredAdmin={true}>
              <CategoryManager />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}

      {/* Toasts */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
