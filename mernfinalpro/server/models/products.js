// models/products.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['furniture', 'kitchen-appliances', 'electronics', 'home-decor', 'tools', 'books', 'toys', 'clothing', 'other']
  },
  subcategory: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  condition: {
    type: String,
    required: true,
    enum: ['excellent', 'good', 'fair']
  },
  qualityScore: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  images: [{
    url: String,
    alt: String
  }],
  specifications: {
    type: Map,
    of: String
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number
  },
  brand: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  yearOfPurchase: {
    type: Number
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verificationDate: {
    type: Date
  },
  verificationNotes: {
    type: String
  },
  tags: [String],
  views: {
    type: Number,
    default: 0
  },
  location: {
    city: String,
    state: String,
    zipCode: String
  },
  deliveryOptions: {
    pickup: {
      type: Boolean,
      default: true
    },
    delivery: {
      type: Boolean,
      default: false
    },
    deliveryRadius: {
      type: Number,
      default: 0
    },
    deliveryFee: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, condition: 1, price: 1 });
productSchema.index({ isAvailable: 1, isVerified: 1 });

module.exports = mongoose.model('Product', productSchema);