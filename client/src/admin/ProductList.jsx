import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductForm from "./ProductForm";

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to delete");

      toast.success("🗑️ Product deleted!");
      fetchProducts();
    } catch {
      toast.error("❌ Failed to delete product");
    }
  };

  return (
    <div>
      {editProduct ? (
        <ProductForm product={editProduct} onSuccess={() => { setEditProduct(null); fetchProducts(); }} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p._id} className="bg-[#1A1D23] p-4 rounded">
              <img src={p.image} alt={p.title} className="h-40 w-full object-cover rounded" />
              <h3 className="font-bold mt-2">{p.title}</h3>
              <p>${p.price}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => setEditProduct(p)} className="bg-blue-500 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="bg-red-500 px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
