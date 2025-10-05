const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }, // Admin flag
  isUser: { type: Boolean, default: true }    // Regular user flag
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
