const express = require('express');
require('dotenv').config();
const connectDB = require('./Connection/connectDB');
const userRoutes = require('./Router/User');
const productRoutes = require('./Router/Product');
const orderRoutes = require('./Router/Order');
const cors = require('cors');
const serverless = require('serverless-http'); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the homepage!');
});
app.use('/api/auth', userRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/orders', orderRoutes); 
module.exports = serverless(app);
