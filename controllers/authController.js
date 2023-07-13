const axios = require('axios');
require('dotenv').config();

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
  const message = `Authentication successful! Access Token: ${access_token}, Refresh Token: ${refresh_token}`;
  res.send(message);

};

module.exports = authController;
