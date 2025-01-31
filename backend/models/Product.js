const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productDescription: { type: String, required: true },
  productPrice: { type: Number, required: true },
  ownerWalletAddress: { type: String, required: true },
  productImage: { type: String, required: true } 
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
