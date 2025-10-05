const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// Middleware to verify token
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

// ➕ Add to Wishlist
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let wishlist = await Wishlist.findOne({ user: req.user.id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user.id, items: [{ product: productId }] });
    } else {
      const exists = wishlist.items.some(
        (item) => item.product.toString() === productId
      );
      if (!exists) wishlist.items.push({ product: productId });
    }

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📝 Get Wishlist
router.get("/", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("items.product");
    res.json(wishlist || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ Remove from Wishlist
router.delete("/remove/:productId", verifyToken, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user.id });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
