const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

router.post('/addproduct', authMiddleware, async (req, res) => {
  // console.log("hi");
  
  const { productName, productDescription, productPrice, productImage } = req.body; // Added productImage

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }

    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      productImage, // Added productImage
      ownerWalletAddress: user.walletAddress
    });

    const savedProduct = await newProduct.save();

    user.myProducts.push(savedProduct._id);
    await user.save();

    res.status(201).send({ message: 'Product added successfully', product: savedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.post('/cart', authMiddleware, async (req, res) => {
  const { productId } = req.body

  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(400).send({ message: 'User not found' })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).send({ message: 'Product not found' })
    }

    user.cart.push(productId)
    await user.save()

    res.status(200).send({ message: 'Product added to cart successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Internal server error' })
  }
})

router.get('/products', async (req, res) => {  
  const { page = 1, limit = 9 } = req.query;

  try {
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments();

    if (products.length === 0) {
      return res.status(200).send({
        message: 'No more products available',
        products: [],
        totalPages: Math.ceil(totalProducts / limit),
        currentPage: parseInt(page)
      });
    }

    res.status(200).send({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).send({ message: 'Product not found' })
    }
    res.status(200).send(product)
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
})

module.exports = router;
