// ==================== ROUTES/PRODUCTROUTES.JS ====================
const express = require("express");
const router = express.Router();
const {
  getFeaturedProducts,
  getProductsByCategory,
  getAllProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");
const { authenticate } = require("../middleware/auth");

// Public routes - SPECIFIC ROUTES MUST COME BEFORE PARAMETER ROUTES
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/", getAllProducts);
router.get("/:id", getProductById); // This should be LAST

// Protected routes
router.post("/", authenticate,  createProduct);

// Comment out these routes until you create the missing controller functions
// router.put('/:id', authenticate, requireAdmin, productController.updateProduct);
// router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

module.exports = router;
