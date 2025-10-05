import React from "react";
import { ArrowRight } from "lucide-react";

// Import images from your assets folder
import JacketImg from "../assets/jacket.jpg";
import TableImg from "../assets/sofa.jpg";
import VinylImg from "../assets/record.jpg";
import PolaroidImg from "../assets/camera.jpg";
import MirrorImg from "../assets/sofa2.jpg";
import DenimImg from "../assets/jacket.jpg";

// Custom ProductCard
const ProductCard = ({ title, price, originalPrice, image, condition, category }) => (
  <div className="rounded-xl border border-gray-700 bg-[#1a1a1a] text-white shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover rounded-t-xl"
    />
    <div className="p-6 text-center">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-400 mb-1">{category} - {condition}</p>
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="font-bold text-[#FFB249]">${price}</span>
        {originalPrice && (
          <span className="line-through text-gray-500 text-sm">${originalPrice}</span>
        )}
      </div>
    </div>
  </div>
);

// Custom Button
const Button = ({ children, variant = "vintage", size = "lg", className, ...props }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-300 focus:outline-none";

  const variants = {
    vintage: "bg-gradient-to-r from-[#FFB249] to-[#FF7F50] text-black hover:shadow-lg hover:shadow-[#FFB249]/30",
    outline: "border border-[#FFB249] text-[#FFB249] hover:bg-[#FFB249] hover:text-black",
    default: "bg-gray-800 text-white hover:bg-gray-700",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Featured Products data with local images
const featuredProducts = [
  { id: "1", title: "Vintage Leather Jacket", price: 45, originalPrice: 120, image: JacketImg, condition: "Excellent", category: "Clothing" },
  { id: "2", title: "Retro Wooden Coffee Table", price: 85, originalPrice: 200, image: TableImg, condition: "Good", category: "Furniture" },
  { id: "3", title: "Classic Vinyl Record Collection", price: 35, image: VinylImg, condition: "Fair", category: "Music" },
  { id: "4", title: "Vintage Polaroid Camera", price: 65, originalPrice: 150, image: PolaroidImg, condition: "Excellent", category: "Electronics" },
  { id: "5", title: "Antique Brass Mirror", price: 55, originalPrice: 110, image: MirrorImg, condition: "Good", category: "Home Decor" },
  { id: "6", title: "Classic Denim Jacket", price: 30, originalPrice: 80, image: DenimImg, condition: "Good", category: "Clothing" },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-[#0d0d0d]">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-50">
            Featured <span className="text-[#FFB249]">Treasures</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hand-picked vintage items that caught our eye. These unique pieces won't last long!
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="vintage" size="lg">
            View All Products <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
