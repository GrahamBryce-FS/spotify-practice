const axios = require("axios");
const { Token } = require('../models');
require('dotenv').config();

// this is written differently in the video at 12:25
exports.getProfile = async (req, res) => {
  console.log("Token in controller", req.token);
  res.json({ message: "profile"})
  const { access_token } = req.token;
  const { data } = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  console.log("Data", data);
  // res.json({ data });
};

exports.albumSearch = async (req, res) => {
  const { code } = req.query;
  const token = await Token.findOne({ where: {} });
  const albumId = '4aawyAB9vmqN3uQ7FjRGTy';
// theres gotta be a better way to do this
  const access_token = token.access_token;
  const apiUrl = `https://api.spotify.com/v1/albums/${albumId}`;
  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Cache-Control': 'no-cache',
    },
  });

  const { refresh_token } = response.data;

  const { data } = response;
  console.log("data", { data });

  const album = {
    id: data.id,
    name: data.name,
    artist: data.artists.map(artist => artist.name).join(', '),
    releaseDate: data.release_date,
    totalTracks: data.total_tracks,
    images: data.images.map(image => image.url),
  };

  console.log(album);
  res.json(album);
};

exports.artistSearch = async (req, res) => {
  const { code } = req.query;
  const token = await Token.findOne({ where: {} });
  if (token) {
    console.log("FROM DB", token);
    // return res.json(token)
  }
  const artistId = '2BTZIqw0ntH9MvilQ3ewNY';
  const access_token = token.access_token;

  const apiUrl = `https://api.spotify.com/v1/artists/${artistId}`;

  const response = await axios.get(apiUrl, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Cache-Control': 'no-cache',
    },
  });
  const { refresh_token } = response.data;
  const { data } = response;

  console.log("data", { data });
  const artist = {
    id: data.id,
    name: data.name,
    followers: data.followers.total,
    genres: data.genres,
    image: data.images[0].url,
  };
  console.log(artist);
  res.json(artist);
};
// below not functioning yet
exports.search = async (req, res) => {
  await axios({
    method: 'GET',

    url: 'https://api.spotify.com/v1/search',
    params: {
      type: 'album,artist,track',
      q: req.query.q,
      limit: 3
    },
    headers: { 
      'Authorization': 'Bearer ' + req.query.access_token,
      'Content-Type': 'application/json'
    }
  }).then(({data}) => {
    res.json(data)
  }).catch((error) => {
    res.json(error)
  
}
  )
  // res.send("search")
}