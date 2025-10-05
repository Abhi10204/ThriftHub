import React from "react";
import { Mail, Sparkles } from "lucide-react";


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
    lg: "px-3 py-2 text-lg",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Newsletter = () => {
  return (
    <section className="py-16 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Small Heading */}
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-[#FFB249] mr-2" />
            <span className="text-[#FFB249] font-semibold uppercase tracking-wider text-sm">
              Stay Updated
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Get the Latest Vintage Finds
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-[#C9B79C] mb-8">
            Subscribe to our newsletter and be the first to know about new
            arrivals, exclusive deals, and vintage fashion tips.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-10 h-12 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB249] text-[#C9B79C]"
              />
            </div>
            <div className="text-center">
              <Button variant="vintage" size="lg">
                Suscribe
              </Button>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-sm text-[#C9B79C] mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
