// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  deliveryMethod: {
    type: String,
    enum: ['pickup', 'delivery'],
    required: true
  },
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  escrowStatus: {
    type: String,
    enum: ['pending', 'held', 'released', 'refunded'],
    default: 'pending'
  },
  paymentIntentId: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'completed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  deliveryConfirmation: {
    confirmedAt: Date,
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    confirmationMethod: {
      type: String,
      enum: ['buyer', 'auto', 'admin']
    }
  },
  trackingInfo: {
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date
  },
  notes: {
    buyer: String,
    seller: String,
    admin: String
  },
  refundReason: {
    type: String
  },
  disputeRaised: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Generate order number
orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `SS-${Date.now()}-${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);