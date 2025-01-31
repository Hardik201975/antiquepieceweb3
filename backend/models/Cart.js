const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImage: { type: String, required: true },
  deliveryLatitude: { type: Number, required: true },
  deliveryLongitude: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
