const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.authorize);
router.get('/callback', authController.callback);

module.exports = router;

