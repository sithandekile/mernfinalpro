// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {userController, register} = require('../controllers/userController');
const { validateRegistration, validateLogin, handleValidationErrors } = require('../utils/validation');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/register',validateRegistration, handleValidationErrors, register);
router.post('/login',validateLogin, handleValidationErrors, userController.login);

// Protected routes
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.get('/store-credit', authenticate, userController.getStoreCredit);

module.exports = router;

