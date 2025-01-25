const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true
}));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/antiqueDB", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Import Routes
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

app.use("/api", userRoutes);
app.use("/api", productRoutes);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
