const axios = require('axios');
require('dotenv').config();
const querystring = require("querystring");
const { Token } = require("../models");



exports.logout = async (req,res) => {
  await Token.destroy({ where: {} });
  return res.status(200).json({ message: "logged out" });
}

exports.refresh = async (req, res) => {
  const token = await Token.findOne({ where: {} });
  
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    },
  });
  console.log("from api", response.data);
  // res.json(response.data);
  const { access_token, refresh_token, expires_in } = response.data;
  await token.update({ access_token, refresh_token, expires_in }, { where: {} });
  return res.json({ token });
};

exports.authorize = (req, res) => {
  const scopes = 'user-read-private user-read-email';
  const authorizeUrl =
    'https://accounts.spotify.com/authorize' +
    `?response_type=code` +
    `&client_id=${process.env.CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;

  res.redirect(authorizeUrl);
};

exports.callback = async (req, res) => {
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
  
    const { access_token, refresh_token, expires_in } = response.data;
    // const message = `Authentication successful! Access Token: ${access_token}, Refresh Token: ${refresh_token}`;
    // console.log(message);
    const token = await Token.create({ access_token, refresh_token,expires_in})
    return res.redirect(`http://localhost:8000/login`);
  }
};