// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: 10,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    condition: {
      type: String,
      required: true,
      enum: ["excellent", "good", "fair", "new"],
    },
    qualityScore: {
      type: Number,
      min: 1,
      max: 5,
    },
    images: {
      type: Array,
      of: String
    },
    specifications: {
      type: Map,
      of: String,
    },
    dimensions: {
      length: { type: Number, min: 0 },
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
      weight: { type: Number, min: 0 },
    },
    brand: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    yearOfPurchase: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear(),
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    verificationDate: Date,
    verificationNotes: String,
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    location: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    deliveryOptions: {
      pickup: {
        type: Boolean,
        default: true,
      },
      delivery: {
        type: Boolean,
        default: false,
      },
      deliveryRadius: {
        type: Number,
        default: 0,
        min: 0,
      },
      deliveryFee: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

//  Text search & compound indexes
productSchema.index({ title: "text", description: "text", tags: "text" });
productSchema.index({ category: 1, condition: 1, price: 1 });
productSchema.index({ isAvailable: 1, isVerified: 1 });

module.exports = mongoose.model("Product", productSchema);
