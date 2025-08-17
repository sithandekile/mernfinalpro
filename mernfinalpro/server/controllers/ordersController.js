const Order = require('../models/orders');
const Product = require('../models/products');
const User = require('../models/User');

// Helper function to generate a unique order number
const generateOrderNumber = () => {
  // Format: ORD + timestamp + random 3-digit number
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

const orderController = {

  // Create new order
  createOrder: async (req, res) => {
    try {
      const { items, deliveryOption, deliveryAddress, notes } = req.body;
      const buyerId = req.user.id;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No items provided for the order'
        });
      }

      // Validate each product
      for (const item of items) {
        if (!item.id || !item.quantity || item.quantity < 1) {
          return res.status(400).json({
            success: false,
            message: 'Invalid product item or quantity'
          });
        }

        const product = await Product.findById(item.id).populate('seller');
        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found: ${item.id}`
          });
        }

        if (product.status !== 'approved') {
          return res.status(400).json({
            success: false,
            message: `Product not available: ${product.title}`
          });
        }

        if (product.seller._id.toString() === buyerId) {
          return res.status(400).json({
            success: false,
            message: 'Cannot buy your own product'
          });
        }
      }

      // Calculate total amount and delivery fee
      let totalAmount = 0;
      let deliveryFee = 0;

      if (deliveryOption === 'local-delivery') {
        deliveryFee = 15; //  flat delivery fee
      }

      for (const item of items) {
        totalAmount += item.price * item.quantity;
      }
      totalAmount += deliveryFee;

      const orderItems = items.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const order = new Order({
        buyer: buyerId,
        items: orderItems,
        deliveryOption,
        deliveryAddress: deliveryOption === 'local-delivery' ? deliveryAddress : undefined,
        deliveryFee,
        totalAmount,
        notes,
        escrowStatus: 'pending',
        status: 'pending',
        orderNumber: generateOrderNumber() 
      });

      await order.save();

      const populatedOrder = await Order.findById(order._id)
        .populate('items.product', 'title price images')
        .populate('buyer', 'firstName lastName phone email');

      res.status(201).json({
        success: true,
        message: 'Order created successfully',
        data: populatedOrder
      });
    } catch (error) {
      console.error('Order creation error:', error);
      res.status(500).json({
        success: false,
        message: 'Error creating order',
        error: error.message
      });
    }
  },

  // Get user orders
  getUserOrders: async (req, res) => {
    try {
      const userId = req.user.id;
      const { type = 'all', page = 1, limit = 10 } = req.query;

      let filter = {};

      if (type === 'buying') {
        filter.buyer = userId;
      } else if (type === 'selling') {
        filter.seller = userId;
      } else {
        filter.$or = [{ buyer: userId }, { seller: userId }];
      }

      const orders = await Order.find(filter)
        .populate('items.product', 'title price images category')
        .populate('buyer', 'firstName lastName')
        .populate('seller', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Order.countDocuments(filter);

      res.json({
        success: true,
        data: orders,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching orders',
        error: error.message
      });
    }
  },

  // Get order by ID
  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('items.product', 'title price images category')
        .populate('buyer', 'firstName lastName email phone')
        .populate('seller', 'firstName lastName email phone');

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Check if user is authorized to view this order
      const userId = req.user.id;
      if (order.buyer._id.toString() !== userId && order.seller._id.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to view this order'
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching order',
        error: error.message
      });
    }
  },

  // Update order status
  updateOrderStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;
      const userId = req.user.id;

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      // Check authorization
      if (order.buyer.toString() !== userId && order.seller.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this order'
        });
      }

      order.status = status;
      if (notes) order.notes = notes;

      // Add tracking update
      order.trackingInfo.updates.push({
        status,
        message: notes || `Order status updated to ${status}`,
        timestamp: new Date()
      });

      await order.save();

      res.json({
        success: true,
        message: 'Order status updated successfully',
        data: order
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error updating order status',
        error: error.message
      });
    }
  },

  // Confirm delivery (buyer only)
  confirmDelivery: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: 'Order not found'
        });
      }

      if (order.buyer.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Only the buyer can confirm delivery'
        });
      }

      if (order.status !== 'delivered') {
        return res.status(400).json({
          success: false,
          message: 'Order must be marked as delivered first'
        });
      }

      order.deliveryConfirmedAt = new Date();
      order.deliveryConfirmedBy = 'buyer';
      order.status = 'completed';
      order.escrowStatus = 'released';

      // Add tracking update
      order.trackingInfo.updates.push({
        status: 'completed',
        message: 'Delivery confirmed by buyer - payment released',
        timestamp: new Date()
      });

      await order.save();

      // Update products status to sold
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, { status: 'sold' });
      }

      res.json({
        success: true,
        message: 'Delivery confirmed successfully - payment has been released',
        data: order
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error confirming delivery',
        error: error.message
      });
    }
  }
};

module.exports = orderController;
