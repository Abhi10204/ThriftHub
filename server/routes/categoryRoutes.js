// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { verifyToken, verifyAdmin } = require("../middleware/middlewares");

// Get all categories
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

// Create category (admin only)
router.post("/", verifyToken, verifyAdmin, async (req, res) => {
  const category = new Category({ name: req.body.name });
  await category.save();
  res.status(201).json(category);
});

// Delete category (admin only)
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

module.exports = router;
