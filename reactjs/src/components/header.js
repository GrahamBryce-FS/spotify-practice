import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './header.css';
import logo from '../assets/Spotify_icon.png';



function Header({ accessToken }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Perform your search operations here
    console.log('Search text:', searchText);
    console.log('Access token:', accessToken);

    // Call functions to get top 5 songs and top 5 artists using the access token
    getTopSongs();
    getTopArtists();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getTopSongs = () => {
    // Use the access token to make an authenticated API request to Spotify to get top songs
    console.log('Fetching top 5 songs...');
    // API request goes here
  };

  const getTopArtists = () => {
    // Use the access token to make an authenticated API request to Spotify to get top artists
    console.log('Fetching top 5 artists...');
    // Implement the API request here and log the top 5 artists
  };

  return (
    <header className="navbar">
      <nav>
        <ul className="nav-links">
          <li className="logo-container">
            <img src={logo} alt="Spotify Logo" className="logo" />
            <Link to="/">Home</Link>
          </li>
          <li className="search-bar-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={handleKeyPress} 
            />
              <Link to={`/search`}>
            <div className="search-button">
                <FaSearch />
            </div>
              </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
