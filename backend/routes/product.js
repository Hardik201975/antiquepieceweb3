const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post('/addproduct', authMiddleware, async (req, res) => {
  const { productName, productDescription, productPrice } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      ownerWalletAddress: user.walletAddress
    });

    const savedProduct = await newProduct.save();

    user.myProducts.push(savedProduct._id);
    await user.save();

    res.status(201).send({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
