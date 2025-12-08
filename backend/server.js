const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./app_server/database/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Backend API' });
});

// Router
app.use('/api/auth', require('./app_server/router/authRouter'));
app.use('/api/users', require('./app_server/router/userRouter'));
app.use('/api/products', require('./app_server/router/productRouter'));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
