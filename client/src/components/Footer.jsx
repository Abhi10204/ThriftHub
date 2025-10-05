import React from "react";
import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

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

const Footer = () => {
  return (
    <footer className="bg-[#1A1D23] border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-[#FFB249]" />
              <span className="font-bold text-lg text-[#FFB249]">
                ThriftHub
              </span>
            </div>
            <p className="text-[#C9B79C] text-sm">
              Discover unique second-hand treasures that tell a story. Your
              one-stop shop for vintage finds and sustainable fashion.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-[#C9B79C] hover:text-[#FFB249]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#C9B79C] hover:text-[#FFB249]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#C9B79C] hover:text-[#FFB249]">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#FFF5E6]">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="/shop"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                Shop All
              </a>
              <a
                href="/categories"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                Categories
              </a>
              <a
                href="/about"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                About Us
              </a>
              <a
                href="/contact"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#FFF5E6]">Customer Service</h3>
            <div className="space-y-2">
              <a
                href="/shipping"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                Shipping Info
              </a>
              <a
                href="/returns"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                Returns & Exchanges
              </a>
              <a
                href="/size-guide"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                Size Guide
              </a>
              <a
                href="/faq"
                className="block text-[#C9B79C] hover:text-[#FFB249] text-sm"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-[#FFF5E6]">Stay Connected</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-[#C9B79C]">
                <Mail className="h-4 w-4" />
                <span>hello@thrifthub.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#C9B79C]">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-[#C9B79C]">
                <MapPin className="h-4 w-4" />
                <span>123 Vintage St, Retro City</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-[#FFF5E6]">Newsletter</p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#FFB249] text-[#C9B79C]"
                />
                <div className="text-center">
                  <Button variant="vintage" size="lg">
                    Suscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2B303B] my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-[#C9B79C]">
            © 2024 ThriftHub. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-[#C9B79C] hover:text-[#FFB249]">
              Privacy Policy
            </a>
            <a href="/terms" className="text-[#C9B79C] hover:text-[#FFB249]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
