// ==================== ROUTES/REFERRALROUTES.JS ====================
const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const auth = require('../middleware/auth');

// Public routes
router.get('/info', referralController.getReferralInfo);
router.post('/apply', referralController.applyReferralCode);
router.post('/complete', referralController.completeReferral);

// Protected routes
router.get('/stats', auth, referralController.getReferralStats);

module.exports = router;