const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

const app = express();

// Connect to database middleware
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ success: false, message: 'DB Error' });
    }
});

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Set security headers
app.use(helmet());

// Enable CORS
app.use(cors({
    origin: true, // Allow all origins dynamically
    credentials: true // Allow sending cookies
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // 100 requests per 10 mins
});
app.use(limiter);

// Route files
const auth = require('./routes/auth');
const tmdb = require('./routes/tmdb');
// Mount routers
app.use('/api/auth', auth);
app.use('/api/tmdb', tmdb);
module.exports = app;
