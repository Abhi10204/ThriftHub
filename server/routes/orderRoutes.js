const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { verifyToken } = require("../middleware/middlewares");

// Create Order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { items, contact, total, shipping } = req.body; // include shipping

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    if (!shipping) {
      return res.status(400).json({ message: "Shipping details are required" });
    }

    const order = new Order({
      user: req.user.id,
      items,
      contact,
      shipping, // save shipping info
      total,
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err); // log full error
    res.status(500).json({ message: "Server error" });
  }
});

// Get user orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
