const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth')
const orderController = require('../controllers/order')
router.post('/login',authController.verifyUser);
router.post('/signup',authController.createUser);
router.post("/agentSignUp",authController.createAgent);
router.post("/agentLogin",authController.verifyAgent);
router.post('/order',orderController.createorder)
module.exports = router;