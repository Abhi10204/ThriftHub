// src/pages/Signup.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
const API_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (formData.name.trim().length < 3) {
      newErrors.name = "Full name is required"; // always this message
    }

    // custom email validation -> must include @ and .com
    if (!formData.email.includes("@") || !formData.email.endsWith(".com")) {
      newErrors.email = "Please enter a valid email";
    }

    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(formData.password)) {
      newErrors.password =
        "Password must have 1 uppercase, 1 number & 1 special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Signup successful! Please login.");
        setFormData({ name: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 1200); // redirect to login
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] p-6">
      <div className="bg-[#1A1D23] p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Signup</h2>

        {message && <p className="mb-4 text-center text-sm text-yellow-400">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-white">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-lg mt-1 text-[#c9a865]"
              placeholder="Jane Doe"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="text" // changed from type="email" to avoid default browser validation
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-lg mt-1 text-[#c9a865]"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-2 border rounded-lg mt-1 text-[#c9a865]"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          <Button type="submit" variant="vintage" size="lg" className="w-full">
            Signup
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FFB249] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
