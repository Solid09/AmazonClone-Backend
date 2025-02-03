const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cartItem: [{
      type: mongoose.Schema.ObjectId,
      ref: "CartItem",
      required: true,
    }],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
