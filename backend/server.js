
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

//Middleware
app.use(cors({ 
  origin: ['http://localhost:3000', 'https://social-ai-dusky.vercel.app'], 
  credentials: true 
}));
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/content',   require('./routes/content'));
app.use('/api/trending',  require('./routes/trending'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/scheduler', require('./routes/scheduler'));

// Health Check 
app.get('/', (req, res) => {
  res.json({ message: '🚀 SocialAI Backend is running!', status: 'OK' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// MongoDB Connection + Server Start 
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/socialai';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
