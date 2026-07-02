const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

const path = require('path');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Set security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https:"],
      connectSrc: ["'self'", "https:"],
      frameSrc: ["'self'", "https:"]
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false
}));

// Enable CORS
app.use(cors({
    origin: true, // Allow all origins dynamically
    credentials: true // Allow sending cookies
}));

// Trust proxy for Render deployment so rate limit works per IP
app.set('trust proxy', 1);

// Rate limiting - higher limit needed since each page load makes many TMDB proxy requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 500, // 500 requests per 10 mins per IP
  standardHeaders: true,
  legacyHeaders: false,
});
// Only apply the limiter to API endpoints, NOT static assets
app.use('/api', limiter);

// Route files
const auth = require('./routes/auth');
const tmdb = require('./routes/tmdb');
// Mount routers
app.use('/api/auth', auth);
app.use('/api/tmdb', tmdb);

// Set static folder
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route to serve index.html for SPA routing
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
