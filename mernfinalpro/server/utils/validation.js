// utils/validation.js
const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone').optional().isMobilePhone().withMessage('Valid phone number required')
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateProduct = [
  body('title').trim().notEmpty().withMessage('Product title is required'),
  body('description').trim().notEmpty().withMessage('Product description is required'),
  body('category').isIn(['furniture', 'kitchen-appliances', 'electronics', 'home-decor', 'tools', 'books', 'toys', 'clothing', 'other']).withMessage('Valid category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('condition').isIn(['excellent', 'good', 'fair']).withMessage('Valid condition is required'),
  body('qualityScore').isInt({ min: 1, max: 5 }).withMessage('Quality score must be between 1 and 5')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: errors.array()
      }
    });
  }
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProduct,
  handleValidationErrors
};

