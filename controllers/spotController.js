const axios = require('axios');
require('dotenv').config();
const { Token } = require("../models");
const spotifyService = require("../services/spotifyServices");


// spotController.searchHandler = async (req,res) => {
//   searchHandler: async (req, res) => {
//     try {
//       const { accessToken } = req.user; 
//       const { query } = req.query; 
  
//       const searchResults = await spotifyService.searchSong(accessToken, query);
  
//       res.json(searchResults);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'An error occurred during the search' });
//     }
//   },
// };
const spotController = {
  searchHandler: async (req, res) => {
    try {
      const { accessToken } = req.user; 
      const { query } = req.query; 
  
      const searchResults = await spotifyService.searchSong(accessToken, query);
  
      res.json(searchResults);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during the search' });
    }
  },
};

module.exports = spotController;