const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  buyerEmail: String,
  amount: Number,
  status: { type: String, default: "pending_release" },
  reference: String,
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
