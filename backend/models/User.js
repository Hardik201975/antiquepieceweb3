const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  walletAddress: { type: String, required: true },
  myProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  myCart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }] // Added myCart field
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
