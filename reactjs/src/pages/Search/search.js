import React, { useState } from 'react';
import './search.css';
import SearchBar from '../../components/SearchBar';
import { searchAlbums, searchSongs } from '../../services/spotify';

const SearchPage = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchTerm = event.target.search.value;

    // Fetch albums and songs separately using the corresponding functions
    const albumResponse = await searchAlbums(searchTerm);
    const songResponse = await searchSongs(searchTerm);

    console.log("From Spotify (Albums):", albumResponse);
    console.log("From Spotify (Songs):", songResponse);

    setAlbums(albumResponse);
    setSongs(songResponse);
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
                <a href={album.external_urls.spotify} key={album.id}>
                  <img alt="album" className='albumImg' src={album.images[0].url} />
                  <p className='albumName'>{album.name}</p>
                </a>
              ))}
            </ul>
          </div>
        )}
        {songs.length > 0 && (
          <div>
            <h3 className='songHeroText'>Songs</h3>
            <ul className='songsContainer'>
              {songs.map((song) => (
                <a href={song.external_urls.spotify} key={song.id}>
                  {/* Display the artist's picture (if available) */}
                  {song.album.images.length > 0 && (
                    <img alt="artist" className='artistImg' src={song.album.images[0].url} />
                  )}
                  <p className='songName'>{song.name}</p>
                  <p className='songArtist'>{song.artists[0].name}</p>
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

// import React, { useState } from 'react';
// import './search.css';
// import SearchBar from '../../components/SearchBar';
// import { searchAlbums } from '../../services/spotify';

// const SearchPage = () => {

// const [albums, setAlbums] = useState([]);

// const handleSearch = async (event) => {
//   event.preventDefault();
//   console.log("Search button clicked!", event.target.search.value);
//   const response = await searchAlbums(event.target.search.value);
//   console.log("From Spotify!", response);
//   setAlbums(response);
// };

//   return (
//     <div className='searchContainer'>
//       <section>

//             <SearchBar className="widthSize" onSubmit={handleSearch} />
//             {albums.length > 0 && (
//               <div>
//                 <h3 className='albumHeroText'>Albums</h3>
//                 <ul className='albumsContainer'>
//                   {albums.map((album) => (
//                     <a href={album.external_urls.spotify}> 
//                       <img alt="album"className='albumImg' src={album.images[0].url}/>
//                       <p className='albumName' key={album.id}>{album.name}</p>
//                     </a>
//                   ))}
//                 </ul>
//               </div>
//             )}
//       </section>
//     </div>
//   );
// };

// export default SearchPage;

