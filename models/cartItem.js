const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://localhost:3000/uploads/defaultPFImg.jpg",
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  isGift: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
