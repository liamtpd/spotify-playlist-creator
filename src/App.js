import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './util/Spotify';

function App() {
  const [ results, setResults ] = useState([]);
  const [ playlist, setPlaylist ] = useState([]);
  const [ playlistName, setPlaylistName] = useState("");

  const performSearch = (userInput) => {
    Spotify.getAccessToken(); // Access Token needed
    Spotify.search(userInput).then(results => {
      console.log("Search results:", results); // Log the results
      setResults(results);
    }).catch(error => {
      console.error("Error fetching search results:", error); // Log any error
    });
    console.log(`Searching for: ${userInput}`); // log if full function executes
  };

  /* const sampleData = [
    { id: 1, title: "Banquet", artist: "Bloc Party", album: "Silent Alarm" },
    { id: 2, title: "Wake Me Up", artist: "Foals", album: "Example" },
  ]; */

  const addTrackToPlaylist = (trackId) => {
    const trackToAdd = results.find(track => track.id === trackId); // replace `results` with `sampleData` to test functionality with static data set
    if (trackToAdd) {
      const playlistTrack ={ ...trackToAdd, uniqueId: Date.now() + trackId };
      setPlaylist(prevPlaylist => [...prevPlaylist, playlistTrack]);
    }
  };
  
  const removeTrackFromPlaylist = (uniqueId) => {
    setPlaylist(prevPlaylist => prevPlaylist.filter(track => track.uniqueId !== uniqueId));
  }

  const savePlaylist = () => {
    const trackUris = playlist.map(track => track.uri); // maps over the playlist array to create an array of track URIs
    Spotify.savePlaylist(playlistName, trackUris).then(() => { // handles saving of playlist to Spotify
      setPlaylist([]); // reset `playlist` to initial state
      setPlaylistName(""); // reset `playlistName` to initial state
    });
  };

  const handlePlaylistNameChange = (name) => {
    setPlaylistName(name);
  };

  return (
    <div>
      <SearchBar onSearch={performSearch} />
      <SearchResults results={results} onAdd={addTrackToPlaylist} /> {/*`sampleData` will be replaced later with the dynamic data received from the API call. */}
      <Playlist 
        playlist={playlist} 
        onRemove={removeTrackFromPlaylist} 
        onNameChange={handlePlaylistNameChange}
        onSave={savePlaylist}
        playlistName={playlistName} 
      />
    </div>
  );
}

export default App;
