// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const consola = require("consola");

const rateLimit = require("express-rate-limit");
const compression = require("compression");
require("dotenv").config();

// // Import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/ordersRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const referralRoutes = require("./routes/refRoutes");

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
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    consola.success({ message: "Database Connected", badge: true })
  )
  .catch((err) =>
    consola.error({
      message: "Unable to connect to database.",
      badge: true,
    })
  );

// // Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/referrals", referralRoutes);

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
