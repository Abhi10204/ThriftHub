const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// =====================
// Middleware
// =====================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

// =====================
// Admin Routes
// =====================

// Create product (Admin only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, price, originalPrice, image, condition, category } = req.body;
    if (!title || !price || !category || !image) {
      return res.status(400).json({ message: "Title, price, category, and image are required" });
    }
    const product = new Product({ title, price, originalPrice, image, condition, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update product (Admin only)
router.put("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete product (Admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// =====================
// User Routes
// =====================

// Get products with pagination (User & Admin)
router.get("/", async (req, res) => {
  try {
    const { category, condition, minPrice, maxPrice, sort, page = 1, limit = 6, search } = req.query;

    let filter = {};
    if (category && category !== "all") filter.category = category;
    if (condition && condition !== "All") filter.condition = condition;
    if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
    if (search) filter.title = { $regex: search, $options: "i" };

    let query = Product.find(filter);

    // Sorting
    if (sort === "price-low") query = query.sort({ price: 1 });
    else if (sort === "price-high") query = query.sort({ price: -1 });
    else query = query.sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    query = query.skip((page - 1) * limit).limit(Number(limit));

    const products = await query;
    res.json({ products, totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get single product by ID (for product detail page)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
