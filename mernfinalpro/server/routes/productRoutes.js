// ==================== ROUTES/PRODUCTROUTES.JS ====================
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {authenticate} = require('../middleware/auth');

// Public routes - SPECIFIC ROUTES MUST COME BEFORE PARAMETER ROUTES
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById); // This should be LAST

// Protected routes
router.post('/', authenticate, productController.createProduct);

// Comment out these routes until you create the missing controller functions
// router.put('/:id', authenticate, requireAdmin, productController.updateProduct);
// router.delete('/:id', authenticate, requireAdmin, productController.deleteProduct);

module.exports = router;