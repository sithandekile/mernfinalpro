// ==================== CONTROLLERS/REFERRALCONTROLLER.JS ====================
const Referral = require('../models/referral');
const User = require('../models/User');

const referralController = {
  // Get user's referral stats
  getReferralStats: async (req, res) => {
    try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      
      const referrals = await Referral.find({ referrer: userId })
        .populate('referee', 'firstName lastName createdAt')
        .sort({ createdAt: -1 });

      const stats = {
        totalReferrals: user.totalReferrals,
        storeCredit: user.storeCredit,
        referralCode: user.referralCode,
        referrals: referrals.map(ref => ({
          id: ref._id,
          refereeName: `${ref.referee.firstName} ${ref.referee.lastName}`,
          status: ref.status,
          rewardAmount: ref.rewardAmount,
          createdAt: ref.createdAt,
          completedAt: ref.completedAt
        }))
      };

      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching referral stats',
        error: error.message
      });
    }
  },

  // Apply referral code during registration
  applyReferralCode: async (req, res) => {
    try {
      const { referralCode, newUserId } = req.body;

      // Find referrer by code
      const referrer = await User.findOne({ referralCode });
      
      if (!referrer) {
        return res.status(404).json({
          success: false,
          message: 'Invalid referral code'
        });
      }

      const newUser = await User.findById(newUserId);
      
      if (!newUser) {
        return res.status(404).json({
          success: false,
          message: 'New user not found'
        });
      }

      if (newUser.referredBy) {
        return res.status(400).json({
          success: false,
          message: 'User already has a referrer'
        });
      }

      // Create referral record
      const referral = new Referral({
        referrer: referrer._id,
        referee: newUser._id,
        rewardAmount: 10 // $10 store credit
      });

      await referral.save();

      // Update user referral info
      newUser.referredBy = referrer._id;
      await newUser.save();

      // Update referrer stats
      referrer.totalReferrals += 1;
      await referrer.save();

      res.json({
        success: true,
        message: 'Referral code applied successfully',
        data: {
          referrerName: `${referrer.firstName} ${referrer.lastName}`,
          rewardAmount: referral.rewardAmount
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error applying referral code',
        error: error.message
      });
    }
  },

  // Complete referral (when referee makes first purchase)
  completeReferral: async (req, res) => {
    try {
      const { userId } = req.body; // referee user ID

      const user = await User.findById(userId);
      
      if (!user || !user.referredBy) {
        return res.status(404).json({
          success: false,
          message: 'User or referrer not found'
        });
      }

      const referral = await Referral.findOne({
        referrer: user.referredBy,
        referee: userId,
        status: 'pending'
      });

      if (!referral) {
        return res.status(404).json({
          success: false,
          message: 'Pending referral not found'
        });
      }

      // Complete referral
      referral.status = 'completed';
      referral.completedAt = new Date();
      await referral.save();

      // Add store credit to referrer
      const referrer = await User.findById(user.referredBy);
      referrer.storeCredit += referral.rewardAmount;
      await referrer.save();

      // Add bonus credit to referee
      user.storeCredit += 5; // $5 welcome bonus
      await user.save();

      res.json({
        success: true,
        message: 'Referral completed successfully',
        data: {
          referrerReward: referral.rewardAmount,
          refereeBonus: 5
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Error completing referral',
        error: error.message
      });
    }
  },

  // Get referral program info
  getReferralInfo: async (req, res) => {
    try {
      const referralInfo = {
        referrerReward: 10, // $10 for referrer
        refereeBonus: 5,    // $5 for referee
        howItWorks: [
          "Share your referral code with friends",
          "They sign up using your code",
          "When they make their first purchase, you both get rewards!",
          "You get $10 store credit, they get $5 welcome bonus"
        ],
        terms: [
          "Referral rewards are credited as store credit",
          "Store credit can be used for any purchase",
          "Referral must complete their first purchase within 30 days",
          "Self-referrals are not allowed"
        ]
      };

      res.json({
        success: true,
        data: referralInfo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching referral info',
        error: error.message
      });
    }
  }
};

module.exports = referralController;


