// // utils/escrowService.js
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// class EscrowService {
//   static async createPaymentIntent(amount, orderId) {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: Math.round(amount * 100), // Convert to cents
//         currency: 'usd',
//         payment_method_types: ['card'],
//         metadata: {
//           orderId: orderId.toString(),
//           type: 'escrow'
//         },
//         capture_method: 'manual' // Hold the payment
//       });

//       return paymentIntent;
//     } catch (error) {
//       throw new Error(`Payment intent creation failed: ${error.message}`);
//     }
//   }

//   static async capturePayment(paymentIntentId) {
//     try {
//       const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId);
//       return paymentIntent;
//     } catch (error) {
//       throw new Error(`Payment capture failed: ${error.message}`);
//     }
//   }

//   static async refundPayment(paymentIntentId, amount = null) {
//     try {
//       const refundData = {
//         payment_intent: paymentIntentId
//       };
      
//       if (amount) {
//         refundData.amount = Math.round(amount * 100);
//       }

//       const refund = await stripe.refunds.create(refundData);
//       return refund;
//     } catch (error) {
//       throw new Error(`Refund failed: ${error.message}`);
//     }
//   }
// }

// module.exports = EscrowService;

