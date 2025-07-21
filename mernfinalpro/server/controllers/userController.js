// controllers/userController.js
const User = require('../models/User');
const Referral = require('../models/referral');
const jwt = require('jsonwebtoken');

// Generate token function
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

const userController = {
  // ======================= REGISTER =======================
  register: async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        password,
        address,
        referralCode
      } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Setup new user
      const user = new User({
        firstName,
        lastName,
        email,
        phone,
        password,
        address
      });

      // Handle referral code
      if (referralCode) {
        const referrer = await User.findOne({ referralCode });
        if (!referrer) {
          return res.status(400).json({
            success: false,
            message: 'Invalid referral code'
          });
        }

        user.referredBy = referrer._id;

        // Save new user before referral creation
        await user.save();

        // Create referral record
        const referral = new Referral({
          referrer: referrer._id,
          referred: user._id,
          referralCode
        });
        await referral.save();

        // Update referrer’s referral list
        referrer.referrals.push(user._id);
        await referrer.save();
      } else {
        await user.save();
      }

      // Token generation
      const token = generateToken(user._id);

      return res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            storeCredit: user.storeCredit,
            referralCode: user.referralCode
          },
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message
      });
    }
  },

  // ======================= LOGIN =======================
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      const token = generateToken(user._id);

      return res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            storeCredit: user.storeCredit,
            referralCode: user.referralCode
          },
          token
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message
      });
    }
  },

  // ======================= GET PROFILE =======================
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      return res.json({
        success: true,
        data: user
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching profile',
        error: error.message
      });
    }
  },

  // ======================= UPDATE PROFILE =======================
  updateProfile: async (req, res) => {
    try {
      const allowedUpdates = ['firstName', 'lastName', 'phone', 'address', 'avatar'];
      const updates = {};

      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key];
        }
      });

      const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true, runValidators: true }
      ).select('-password');

      return res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error updating profile',
        error: error.message
      });
    }
  },

  // ======================= GET STORE CREDIT =======================
  getStoreCredit: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      return res.json({
        success: true,
        data: {
          storeCredit: user.storeCredit
        }
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching store credit',
        error: error.message
      });
    }
  }
};

module.exports = userController;
