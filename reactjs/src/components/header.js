import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './header.css';
import logo from '../assets/Spotify_icon.png';

function Header() {
  return (
    <header className="navbar">
      <nav>
        <ul className="nav-links">
          <li className="logo-container">
            <img src={logo} alt="Spotify Logo" className="logo" />
            <Link to="/">Home</Link>
          </li>
          <li className="search-bar-container">
            <Link to={`/search`}>
              <div className="search-button">
              <FaSearch />
              </div>
            </Link>
          </li>
            <Link to="/login">Login</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
