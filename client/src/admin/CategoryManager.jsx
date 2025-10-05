import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const token = localStorage.getItem("token");

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Add Category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return toast.error("⚠️ Enter category name");

    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (!res.ok) throw new Error("Failed to add category");

      toast.success("✅ Category added!");
      setNewCategory("");
      fetchCategories();
    } catch {
      toast.error("❌ Failed to add category");
    }
  };

  // ✅ Delete Category
  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;

    try {
      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("🗑️ Category deleted!");
      fetchCategories();
    } catch {
      toast.error("❌ Failed to delete category");
    }
  };

  return (
    <div className="bg-[#1A1D23] p-6 rounded space-y-4">
      <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New Category"
          className="flex-1 p-2 rounded bg-black text-white border"
        />
        <button type="submit" className="bg-[#FFB84C] text-black px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* Categories List */}
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c._id} className="flex justify-between items-center bg-[#2A2D35] px-4 py-2 rounded">
            <span>{c.name}</span>
            <button
              onClick={() => handleDelete(c._id)}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
