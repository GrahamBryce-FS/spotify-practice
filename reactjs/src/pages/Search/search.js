import React from 'react';
import './search.css';

const Search = () => {


  return (
    <div className='searchContainer'>
      <section>
        <h1>Artists</h1>
          <div className='spacing'>
            <div className="artist-card">
              <div className="artist-image">
                <img src="artist_picture.jpg" alt="Artists picture" />
              </div>
              <div className="artist-details">
                <h3 className="artist-name">Artist Name</h3>
                  <p className="artist-genre">Artist</p>
              </div>
            </div>
            <div className="artist-card">
              <div className="artist-image">
                <img src="artist_picture.jpg" alt="Artists picture" />
              </div>
              <div className="artist-details">
                <h3 className="artist-name">Artist Name</h3>
                  <p className="artist-genre">Artist</p>
              </div>
            </div>
            <div className="artist-card">
              <div className="artist-image">
                <img src="artist_picture.jpg" alt="Artists picture" />
              </div>
              <div className="artist-details">
                <h3 className="artist-name">Artist Name</h3>
                  <p className="artist-genre">Artist</p>
              </div>
            </div>
          </div>
      </section>
      <section>
        <h1>Albums</h1>
          <div className='spacing'>
            <div className="album-card">
              <div className="album-image">
                <img src="album_picture.jpg" alt="Album" />
              </div>
              <div className="album-details">
                <h3 className="album-name">Album Name</h3>
                  <p className="album-release-date">Release Date</p>
                  <p className="album-artist">Artist Name</p>
              </div>
            </div>
            <div className="album-card">
              <div className="album-image">
                <img src="album_picture.jpg" alt="Album" />
              </div>
              <div className="album-details">
                <h3 className="album-name">Album Name</h3>
                  <p className="album-release-date">Release Date</p>
                  <p className="album-artist">Artist Name</p>
              </div>
            </div>
            <div className="album-card">
              <div className="album-image">
                <img src="album_picture.jpg" alt="Album" />
              </div>
              <div className="album-details">
                <h3 className="album-name">Album Name</h3>
                  <p className="album-release-date">Release Date</p>
                  <p className="album-artist">Artist Name</p>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default Search;
