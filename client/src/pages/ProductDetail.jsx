import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-[#C9B77A]"
      >
        <ArrowLeft /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 bg-[#1A1D23] p-6 rounded-lg shadow">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded"
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-xl text-[#C9B77A]">${product.price}</p>
          <p className="text-gray-300">{product.description}</p>

          <div className="flex gap-4 mt-4">
            <button className="flex items-center gap-2 bg-[#FFB84C] text-black px-4 py-2 rounded">
              <ShoppingCart /> Add to Cart
            </button>
            <button className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded">
              <Heart /> Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
