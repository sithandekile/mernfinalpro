
const Product = require('../models/products');
const Order = require('../models/orders');
const User = require('../models/User');

const adminController = {
  // Get pending products for approval
  getPendingProducts: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const products = await Product.find({ status: 'pending' })
        .populate('seller', 'firstName lastName email phone')
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);

      const total = await Product.countDocuments({ status: 'pending' });

      res.json({
        success: true,
        data: products,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching pending products',
        error: error.message
      });
    }
  },

  // Approve product
  approveProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { qualityScore, notes } = req.body;

      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      product.status = 'approved';
      product.isVerified = true;
      product.verifiedBy = req.user.id;
      product.verificationDate = new Date();
      
      if (qualityScore) {
        product.qualityScore = qualityScore;
      }

      await product.save();

      res.json({
        success: true,
        message: 'Product approved successfully',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error approving product',
        error: error.message
      });
    }
  },

  // Reject product
  rejectProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const product = await Product.findById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      product.status = 'rejected';
      product.rejectionReason = reason;

      await product.save();

      res.json({
        success: true,
        message: 'Product rejected',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error rejecting product',
        error: error.message
      });
    }
  },

  // Get all orders (admin view)
  getAllOrders: async (req, res) => {
    try {
      const { page = 1, limit = 20, status } = req.query;

      const filter = {};
      if (status && status !== 'all') {
        filter.orderStatus = status;
      }

      const orders = await Order.find(filter)
        .populate('product', 'name price category')
        .populate('buyer', 'firstName lastName email')
        .populate('seller', 'firstName lastName email')
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

  // Get dashboard statistics
  getDashboardStats: async (req, res) => {
    try {
      const [
        totalProducts,
        pendingProducts,
        totalOrders,
        completedOrders,
        totalUsers,
        totalRevenue
      ] = await Promise.all([
        Product.countDocuments(),
        Product.countDocuments({ status: 'pending' }),
        Order.countDocuments(),
        Order.countDocuments({ orderStatus: 'completed' }),
        User.countDocuments(),
        Order.aggregate([
          { $match: { orderStatus: 'completed' } },
          { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ])
      ]);

      // Get recent activity
      const recentOrders = await Order.find()
        .populate('product', 'name')
        .populate('buyer', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(5);

      const stats = {
        overview: {
          totalProducts,
          pendingProducts,
          totalOrders,
          completedOrders,
          totalUsers,
          totalRevenue: totalRevenue[0]?.total || 0
        },
        recentActivity: recentOrders.map(order => ({
          id: order._id,
          product: order.product.name,
          buyer: `${order.buyer.firstName} ${order.buyer.lastName}`,
          amount: order.totalAmount,
          status: order.orderStatus,
          date: order.createdAt
        }))
      };

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching dashboard stats',
        error: error.message
      });
    }
  }
};

module.exports = adminController;

// // ==================== MIDDLEWARE/AUTH.JS ====================
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const auth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'No token provided, access denied'
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
//     const user = await User.findById(decoded.userId).select('-password');

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'Token is not valid'
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: 'Token is not valid'
//     });
//   }
// };

// module.exports = auth;
