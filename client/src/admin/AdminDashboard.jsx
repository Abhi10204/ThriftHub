import { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import CategoryManager from "./CategoryManager";
import Button from "../components/Button";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="min-h-screen bg-[#111111] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex gap-4 mb-6">
        <Button variant={activeTab === "list" ? "vintage" : "outline"} onClick={() => setActiveTab("list")}>
          Products
        </Button>
        <Button variant={activeTab === "add" ? "vintage" : "outline"} onClick={() => setActiveTab("add")}>
          Add Product
        </Button>
        <Button variant={activeTab === "categories" ? "vintage" : "outline"} onClick={() => setActiveTab("categories")}>
          Categories
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "list" && <ProductList />}
      {activeTab === "add" && <ProductForm />}
      {activeTab === "categories" && <CategoryManager />}
    </div>
  );
};

export default AdminDashboard;
