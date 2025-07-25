// ==================== CONTROLLERS/PRODUCTCONTROLLER.JS
const Product = require('../models/products');

const productController = {
  // Get all approved products with filtering
  getAllProducts: async (req, res) => {
    try {
      const { 
        category, 
        condition, 
        minPrice, 
        maxPrice, 
        search, 
        page = 1, 
        limit = 12,
        sortBy = 'createdAt',
        sortOrder = 'desc'
      } = req.query;

      const filter = { 
        status: 'approved',
        isVerified: true 
      };

      if (category && category !== 'all') {
        filter.category = category;
      }

      if (condition && condition !== 'all') {
        filter.condition = condition;
      }

      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }

      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },  // Changed 'name' to 'title'
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const products = await Product.find(filter)
        .populate('seller', 'firstName lastName rating')
        .sort(sortOptions)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const total = await Product.countDocuments(filter);

      res.json({
        success: true,
        data: products,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products',
        error: error.message
      });
    }
  },

  // Get single product by ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate('seller', 'firstName lastName rating address phone');

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Increment view count
      product.views += 1;
      await product.save();

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching product',
        error: error.message
      });
    }
  },

  // Get products by category
  getProductsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const { limit = 8 } = req.query;

      const products = await Product.find({
        category,
        status: 'approved',
        isVerified: true
      })
      .populate('seller', 'firstName lastName rating')
      .limit(Number(limit))
      .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching products by category',
        error: error.message
      });
    }
  },

  // Get featured/recommended products
  getFeaturedProducts: async (req, res) => {
    try {
      const { limit = 6 } = req.query;

      const products = await Product.find({
        status: 'approved',
        isVerified: true,
        qualityScore: { $gte: 4 }
      })
      .populate('seller', 'firstName lastName rating')
      .sort({ qualityScore: -1, views: -1 })
      .limit(Number(limit));

      res.json({
        success: true,
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching featured products',
        error: error.message
      });
    }
  },

  // Create new product (seller only)
  createProduct: async (req, res) => {
    try {
      const productData = {
        ...req.body,
        seller: req.user.id
      };

      const product = new Product(productData);
      await product.save();

      res.status(201).json({
        success: true,
        message: 'Product created successfully and pending approval',
        data: product
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error creating product',
        error: error.message
      });
    }
  }
};

module.exports = productController;