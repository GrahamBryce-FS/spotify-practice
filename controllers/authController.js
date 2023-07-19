const axios = require('axios');
require('dotenv').config();
const { Token } = require("../models");



const authController = {};

authController.authorize = (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const authorizeUrl =
    'https://accounts.spotify.com/authorize' +
    `?response_type=code` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

  res.redirect(authorizeUrl);
};

authController.callback = async (req, res) => {
  const { code } = req.query;

  const token = await Token.findOne({ where: {} });
  
  if (token){
    console.log("FROM DB", token);
    return res.json(token)
  }

  if(!token && code){
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.REDIRECT_URI,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      },
    });
  
    const { access_token, refresh_token } = response.data;
  
    // Do something with access_token and refresh_token
    // const message = `Authentication successful! Access Token: ${access_token}, Refresh Token: ${refresh_token}`;
    // res.send(message);
    const token = await Token.create({ access_token, refresh_token})
    return res.json(token)
  }
};


authController.search = async (req, res) => {
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






authController.artistSearch = async (req, res) => {
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


authController.albumSearch = async (req, res) => {
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



module.exports = authController;