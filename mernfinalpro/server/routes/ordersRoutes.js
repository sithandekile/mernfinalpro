// ==================== ROUTES/ORDERROUTES.JS ====================
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/ordersController');
const {authenticate} = require('../middleware/auth');

// All routes require authentication
router.use(authenticate);

router.post('/', orderController.createOrder);
router.get('/', orderController.getUserOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/confirm-delivery', orderController.confirmDelivery);

module.exports = router;