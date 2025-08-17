const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticate } = require('../middleware/auth');

// Apply authentication to all payment routes
router.use(authenticate);

// Create a payment record manually (optional)
router.post('/create', paymentController.createPaymentRecord);

// Initialize a payment with Paystack (frontend calls this)
router.post('/init', paymentController.initPayment);

// Verify payment after transaction is completed
router.get('/verify/:reference', paymentController.verifyPayment);

// Release payment to seller manually
router.post('/release/:id', paymentController.releasePayment);

module.exports = router;
