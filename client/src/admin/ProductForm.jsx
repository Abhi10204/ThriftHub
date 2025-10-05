import { useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

const ProductForm = ({ product = null, onSuccess }) => {
  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    category: product?.category || "Clothing",
    condition: product?.condition || "New",
    imageLink: product?.image || "",
    imageFile: null,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.imageLink;

    // If file uploaded, convert to base64 (simple way) or send via FormData
    if (form.imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        imageUrl = reader.result;

        await saveProduct(imageUrl);
      };
      reader.readAsDataURL(form.imageFile);
    } else {
      await saveProduct(imageUrl);
    }
  };

 const saveProduct = async (imageUrl) => {
  try {
    const payload = {
      title: form.title.trim(),
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      category: form.category,
      condition: form.condition,
      image: imageUrl || "", // must be non-empty
    };

    console.log("Submitting product payload:", payload);

    const res = await fetch(
      `${API_URL}/products${product ? "/" + product._id : ""}`,
      {
        method: product ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Failed to save product");
    }

    toast.success(product ? "✅ Product updated!" : "✅ Product added!");
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error("Save product error:", err);
    toast.error("❌ " + err.message);
  }
};


  return (
    <form onSubmit={handleSubmit} className="bg-[#1A1D23] p-6 rounded space-y-4">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="p-2 w-full rounded bg-black text-white border" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" className="p-2 w-full rounded bg-black text-white border" required />
      <input name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="Original Price" type="number" className="p-2 w-full rounded bg-black text-white border" />

      {/* Category */}
      <select name="category" value={form.category} onChange={handleChange} className="p-2 w-full rounded bg-black text-white border">
        <option>Clothing</option>
        <option>Shoes</option>
        <option>Accessories</option>
        <option>Home</option>
      </select>

      {/* Condition */}
      <select name="condition" value={form.condition} onChange={handleChange} className="p-2 w-full rounded bg-black text-white border">
        <option>New</option>
        <option>Used</option>
      </select>

      {/* Image Input */}
      <input name="imageLink" value={form.imageLink} onChange={handleChange} placeholder="Image URL" className="p-2 w-full rounded bg-black text-white border" />
      <p className="text-gray-400 text-sm">OR upload an image file</p>
      <input type="file" accept="image/*" onChange={handleChange} className="w-full" />

      <button type="submit" className="bg-[#FFB84C] text-black font-bold px-4 py-2 rounded">
        {product ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default ProductForm;
