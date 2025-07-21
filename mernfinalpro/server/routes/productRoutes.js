
// ==================== ROUTES/PRODUCTROUTES.JS ====================
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/', auth, productController.createProduct);

module.exports = router;
