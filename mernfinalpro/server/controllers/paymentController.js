const Payment = require('../models/payment');
const Order = require('../models/orders');
const axios = require('axios');
const crypto = require('crypto');

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
if (!PAYSTACK_SECRET_KEY) {
  console.error("⚠️ PAYSTACK_SECRET_KEY is not set in environment variables!");
}

// Create a payment record and link to order
exports.createPaymentRecord = async (req, res) => {
  const { email, amount, orderId } = req.body;

  try {
    const reference = `PAY-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const payment = new Payment({
      buyerEmail: email,
      amount,
      reference,
      order: orderId,
      status: "pending_release",
    });

    await payment.save();

    if (orderId) {
      await Order.findByIdAndUpdate(orderId, { payment: payment._id });
    }

    res.json({ success: true, payment });
  } catch (err) {
    console.error("Error creating payment record:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Initialize Paystack payment
exports.initPayment = async (req, res) => {
  const { email, amount, orderId, currency = 'ZAR' } = req.body;

  try {
    if (!email || !amount || !orderId) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const reference = `PAY-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    // Save payment in DB
    const payment = new Payment({
      buyerEmail: email,
      amount: Math.round(amount), // smallest unit
      reference,
      order: orderId,
      status: "pending_release",
    });
    await payment.save();

    // Link payment to order
    await Order.findByIdAndUpdate(orderId, { payment: payment._id });

    // Prepare payload for Paystack
    const payload = {
      email,
      amount: Math.round(amount), // smallest unit
      currency,
      reference,
      callback_url: 'https://localhost:5173/verify-payment', // change to your frontend URL
      metadata: { orderId }
    };

    console.log('Paystack payload:', payload);

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      payload,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = response.data;

    if (data.status) {
      return res.status(200).json({
        success: true,
        paymentUrl: data.data.authorization_url,
        reference,
        paymentId: payment._id
      });
    } else {
      console.error('Paystack returned error:', data);
      return res.status(400).json({ success: false, error: "Failed to initialize payment", data });
    }

  } catch (error) {
    console.error('Paystack init error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, error: "Payment initialization failed" });
  }
};

// Verify payment with Paystack
exports.verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });

    const data = response.data.data;

    if (data.status === "success") {
      const payment = await Payment.findOneAndUpdate(
        { reference },
        { status: "paid" },
        { new: true }
      );
      return res.json({ verified: true, payment });
    } else {
      return res.json({ verified: false });
    }
  } catch (error) {
    console.error("Payment verification error:", error.response?.data || error.message);
    return res.status(500).json({ error: "Verification failed" });
  }
};

// Release payment to seller
exports.releasePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).send("Payment not found");

    payment.status = "released";
    await payment.save();

    res.send("Payment released to seller (manual payout needed)");
  } catch (err) {
    console.error("Error releasing payment:", err);
    res.status(500).send("Error releasing payment");
  }
};
