import React from 'react';
import axios from 'axios';
import '../../assets/global.css'; 

const Login = () => {
  const handleLogin = () =>{
// handle login function for onClick button event 
  }


  return (
    <div className="loginContainer">
      <h1>In order to use this service, you must sign in to your Spotify account</h1>
      <button className="loginButton">Sign in with Spotify</button>
    </div>
  );
};

export default Login;