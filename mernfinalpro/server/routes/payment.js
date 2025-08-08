// // routes/payment.js
// const express = require('express');
// const router = express.Router();
// const EscrowService = require('../utils/escrowService');

// router.post('/create-payment-intent', async (req, res) => {
//   const { amount, orderId } = req.body;

//   try {
//     const paymentIntent = await EscrowService.createPaymentIntent(amount, orderId);
//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/capture-payment', async (req, res) => {
//   const { paymentIntentId } = req.body;

//   try {
//     const paymentIntent = await EscrowService.capturePayment(paymentIntentId);
//     res.status(200).json({ success: true, paymentIntent });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/refund-payment', async (req, res) => {
//   const { paymentIntentId, amount } = req.body;

//   try {
//     const refund = await EscrowService.refundPayment(paymentIntentId, amount);
//     res.status(200).json({ success: true, refund });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
