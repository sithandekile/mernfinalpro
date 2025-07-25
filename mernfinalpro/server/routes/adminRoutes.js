// ==================== ROUTES/ADMINROUTES.JS ====================
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const {authenticate} = require('../middleware/auth');
const adminAuth = require('../middleware/adminMiddleware');

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(adminAuth);

router.get('/products/pending', adminController.getPendingProducts);
router.put('/products/:id/approve', adminController.approveProduct);
router.put('/products/:id/reject', adminController.rejectProduct);
router.get('/orders', adminController.getAllOrders);
router.get('/stats', adminController.getDashboardStats);

module.exports = router;
