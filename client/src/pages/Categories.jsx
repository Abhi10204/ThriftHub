import React from "react";
import { 
  Shirt, Armchair, Book, Headphones, Watch, Camera, ArrowRight 
} from "lucide-react";

// Custom Card component
const Card = ({ className, children }) => (
  <div className={`rounded-xl border border-gray-700 bg-[#1a1a1a] text-white shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:border-[#FF9233] ${className}`}>
    {children}
  </div>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 text-center ${className}`}>
    {children}
  </div>
);

// Custom Button component
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

// Categories data
const categories = [
  { name: "Clothing", icon: Shirt, count: "2,847 items", color: "text-[#FF9233]" },
  { name: "Furniture", icon: Armchair, count: "1,203 items", color: "text-[#FF9233]" },
  { name: "Books", icon: Book, count: "5,621 items", color: "text-[#FF9233]" },
  { name: "Electronics", icon: Headphones, count: "934 items", color: "text-[#FF9233]" },
  { name: "Accessories", icon: Watch, count: "1,567 items", color: "text-[#FF9233]" },
  { name: "Collectibles", icon: Camera, count: "789 items", color: "text-[#FF9233]" },
];

const Categories = () => {
  return (
    <section className="py-16 bg-[#0d0d0d]">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-50">
            Shop by <span className="text-[#FFB249]">Category</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our curated collection of vintage finds across different categories
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.name} className="cursor-pointer">
                <CardContent>
                  <div className="mb-4 flex justify-center">
                    <Icon className={`h-10 w-10 ${category.color} transition-transform duration-300 group-hover:scale-110`} />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.count}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button variant="vintage" size="lg">
            View All Categories <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
