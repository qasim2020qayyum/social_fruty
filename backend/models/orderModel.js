const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      default: () => Math.floor(Math.random() * 900000) + 100000, // generate a random 6-digit order ID
      unique: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    product: [],
    status: {
      type: String,
    },
    totalPrice: {
      type: String,
      default: 0,
    },
    userTotalPrices: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
