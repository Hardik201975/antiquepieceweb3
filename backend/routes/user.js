const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

router.post('/signup', async (req, res) => {
  const { username, email, password, walletAddress } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, walletAddress });
    await newUser.save();
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send({ message: 'Username already exists' });
    } else {
      res.status(500).send({ message: 'Internal server error' });
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordTrue = await bcrypt.compare(password, user.password);
      if (!isPasswordTrue) {
        return res.status(400).json({ message: "Incorrect Email or Password" });
      }

      const tokenData = {
        id: user._id,
        type: 'user'
      };

      const token = jwt.sign(tokenData, "hgsfjahjf", { expiresIn: '2d' });

      return res.status(200).cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 }).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        message: "Login is done successfully"
      });
    } else {
      res.status(400).send({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;