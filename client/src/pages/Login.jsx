// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};

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
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        // Save token
        localStorage.setItem("token", data.token);

        // Save user object with unified role flags
        localStorage.setItem("user", JSON.stringify(data.user));

        // Trigger Header update immediately
        window.dispatchEvent(new Event("login"));

        setMessage("✅ Login successful!");
        setFormData({ email: "", password: "" });

        // Redirect based on role
        setTimeout(() => {
          if (data.user.isAdmin) {
            navigate("/admin"); // Admin dashboard
          } else {
            navigate("/"); // Normal user homepage
          }
        }, 500);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111111] p-6">
      <div className="bg-[#1A1D23] p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>

        {message && (
          <p className="mb-4 text-center text-sm text-yellow-400">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded-lg mt-1 text-[#c9a865]"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded-lg mt-1 text-[#c9a865]"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>

          <Button type="submit" variant="vintage" size="lg" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-4 text-sm text-gray-400 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#FFB249] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
