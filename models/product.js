const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: Buffer,
    default: "https://localhost:3000/uploads/defaultPFImg.jpg",
  },
  rating: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 1,
    max: 5,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  price: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  brand:{
    type: String,
    required: true
  },
  color: {
    type: String,
    default: null,
  },
  material: {
    type: String,
    required: true,
  },
  batteryTiming: {
    type: String,
    default: null,
  },
  bluetooth: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
  quality: {
    type: String,
    required: true,
  },
  hardcopy: {
    type: String,
    default: null,
  },
  softcopy: {
    type: String,
    default: null,
  },
  importCharges: {
    type: mongoose.Types.Decimal128,
    default: null,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
