const express = require('express');
const router = express.Router();
const {authorize, callback, logout, refresh} = require('../controllers/authController');

// GET localhost:3000/api/v1/auth/
router.get('/login', authorize);
router.get('/callback', callback);
router.get('/logout', logout)
router.get('/refresh', refresh)


module.exports = router;


// these below need to be moved to spotify controller
// router.get('/search', authController.search);
// router.get('/artist', authController.artistSearch);
// router.get('/album', authController.albumSearch);