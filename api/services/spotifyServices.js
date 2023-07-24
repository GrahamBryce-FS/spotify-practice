const axios = require('axios');
require('dotenv').config();
const express = require('express');
const app = express();

const spotifyService = {
  searchSong: async (accessToken, query) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const { data } = response;
      const searchResults = data.tracks.items.map(item => ({
        id: item.id,
        name: item.name,
        artist: item.artists.map(artist => artist.name).join(', '),

      }));
      return searchResults;
    } catch (error) {

      console.error(error);
    }
  },
};

module.exports = spotifyService;