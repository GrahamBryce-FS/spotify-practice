import React from 'react';
import '../../assets/global.css'; 
import { logout } from '../../services/spotify';


const Login = () => {

  const scopes = 'user-read-private user-read-email';
  const authorizeUrl =
    'https://accounts.spotify.com/authorize' +
    `?response_type=code` +
    `&client_id=cf6058394e5c40dbbbd0af6bc8b8857a` +
    `&scope=${encodeURIComponent(scopes)}` +
    `&redirect_uri=http://localhost:3000/api/v1/auth/callback`;


  const handleLogin = async () => {
    try {
      window.location.href = authorizeUrl;
    
      const response = await fetch('http://localhost:3000/api/v1/auth/callback'); 
      const data = await response.json();
    
      localStorage.setItem('accessToken', data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      localStorage.setItem('expiresIn', data.expires_in);
    
      window.location.href = '/';
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <div className="loginContainer">
      <h1>In order to use this service, you must sign in to your Spotify account</h1>
      <button className="loginButton" onClick={handleLogin}>Sign in with Spotify</button>
      <button className="logoutButton" onClick={logout}>Log Out</button>
    </div>
  );
};

export default Login;