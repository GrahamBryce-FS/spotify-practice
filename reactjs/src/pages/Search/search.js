import React, { useState } from 'react';
import './search.css';
import SearchBar from '../../components/SearchBar';
import { searchAlbums } from '../../services/spotify';

const SearchPage = () => {

const [albums, setAlbums] = useState([]);

const handleSearch = async (event) => {
  event.preventDefault();
  console.log("Search button clicked!", event.target.search.value);
  const response = await searchAlbums(event.target.search.value);
  console.log("From Spotify!", response);
  setAlbums(response);
};

  return (
    <div className='searchContainer'>
      <section>

            <SearchBar className="widthSize" onSubmit={handleSearch} />
            {albums.length > 0 && (
              <div>
                <h3 className='albumHeroText'>Albums</h3>
                <ul className='albumsContainer'>
                  {albums.map((album) => (
                    <a href={album.external_urls.spotify}> 
                      <img alt="album"className='albumImg' src={album.images[0].url}/>
                      <p className='albumName' key={album.id}>{album.name}</p>
                    </a>
                  ))}
                </ul>
              </div>
            )}
      </section>
    </div>
  );
};

export default SearchPage;

