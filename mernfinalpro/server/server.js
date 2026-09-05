// server.js
require('dotenv').config();
const express = require("express");
const mongoose=require('mongoose')
const consola=require('consola')
const cors = require("cors");
// const bodyParser = require("body-parser");

const rateLimit = require("express-rate-limit");
const compression = require("compression");
const connectDB=require('./config/db')

// // Import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const referralRoutes = require("./routes/refRoutes");
 const paymentRoutes = require('./routes/payment');

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173', // Dev
  'https://safe-swap-pre-loved-goods.vercel.app/' // Prod
];


const app = express();
app.use(express.json({
  limit: "300mb"
}))
// Security middleware
app.use(compression());

// app.use(
//   bodyParser.urlencoded({
//     limit: "3000mb",
//     extended: true,
//   })
// );

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    console.log(`API Origin: ${origin}`);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`API Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS (REST API)"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) =>
    consola.success({ message: "Database Connected", badge: true })
  )
  .catch((err) =>
    consola.error({
      message: "Unable to connect to database.",
      badge: true,
    })
  );
 // Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/referrals", referralRoutes);
 app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    error: {
      message: error.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

app.listen(process.env.PORT || 8080, () => {
  consola.success({
    message: `Server started on port ${process.env.PORT || 8080}`,
    badge: true,
  });
});

module.exports = app;
