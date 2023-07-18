const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const spotController = require('../controllers/spotController')

router.get('/login', authController.authorize);
router.get('/callback', authController.callback);
router.get('/search', spotController.searchHandler);

module.exports = router;

