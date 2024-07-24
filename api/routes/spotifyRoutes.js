const express = require("express");
const router = express.Router();
const axios = require("axios");
const { getProfile,
        search,
        artistSearch,
        albumSearch
  } = require("../controllers/spotifyController");

// GET /api/v1/spotify/profile
router.get("/profile", getProfile);
router.get('/search', search);
router.get('/artist', artistSearch);
router.get('/album', albumSearch);

module.exports = router;