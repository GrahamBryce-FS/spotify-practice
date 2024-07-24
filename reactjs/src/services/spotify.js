import axios from "axios";

// export const refreshToken = async () => {
//   try {
//     const response = await fetch('http://localhost:3000/api/v1/auth/refresh');
//     const data = await response.json();

//     localStorage.setItem('accessToken', data.access_token);
//     localStorage.setItem('refreshToken', data.refresh_token);
//     localStorage.setItem('expiresIn', data.expires_in);

//   } catch (error) {
//     console.error('Error refreshing token:', error);
//   }
// };

export const logout = async () => {
  // Clear all localStorage items

  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("expiresIn");

  await axios.get(`http://localhost:3000/api/v1/auth/logout`);
  // Navigate to homepage
  window.location = window.location.origin;
};

// export const accessToken = getAccessToken();

const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  console.log("access token found");
  axios.defaults.baseURL = "https://api.spotify.com/v1";
  axios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  axios.defaults.headers["Content-Type"] = "application/json";
}
if (!accessToken) {
  console.error("No access token found");
}



export const getCurrentUserProfile = () => axios.get("/me");




export const searchAlbums = async (searchTerm) => {
  const artist = await axios.get(`/search?q=${searchTerm}&type=artist`);
  const artistId = artist.data.artists.items[0].id;
  const albums = await axios.get(
    `artists/${artistId}/albums?include_groups=album%2Csingle&market=US&limit=5&offset=0`
  );
  // console.log("albums", albums.data.items);
  return albums.data.items;
};


export const searchSongs = async (searchTerm) => {
  const songs = await axios.get(`/search?q=${searchTerm}&type=track&market=US&limit=10&offset=0`);
  // console.log("songs", songs.data.tracks.items);
  return songs.data.tracks.items;
};



