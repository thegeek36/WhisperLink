// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const message = require('./routes/message');
const cors = require('cors');
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(cors());
// Middleware for parsing JSON requests
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/', message);
// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
