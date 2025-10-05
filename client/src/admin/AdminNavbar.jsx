// src/components/AdminNavbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, PlusCircle, Tags, LogOut } from "lucide-react";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#111111] text-white border-b border-gray-700 px-6 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold text-[#FFB249]">Admin Panel</h1>
      <ul className="flex space-x-6">
        <li>
          <Link
            to="/admin"
            className="flex items-center space-x-1 hover:text-[#FFB249]"
          >
            <LayoutDashboard size={18} /> <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/products"
            className="flex items-center space-x-1 hover:text-[#FFB249]"
          >
            <Package size={18} /> <span>Products</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/products/new"
            className="flex items-center space-x-1 hover:text-[#FFB249]"
          >
            <PlusCircle size={18} /> <span>Add Product</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/categories"
            className="flex items-center space-x-1 hover:text-[#FFB249]"
          >
            <Tags size={18} /> <span>Categories</span>
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 hover:text-red-400"
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
