import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import Spotify from './util/Spotify';
import Alert from './Alert';
import './App.css';

function App() {
  const [ results, setResults ] = useState([]);
  const [ playlist, setPlaylist ] = useState([]);
  const [ playlistName, setPlaylistName] = useState("");
  const [ alert, setAlert ] = useState({ visible: false, message: "" });

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
      showAlert("Track has been added to playlist");
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
      showAlert("Playlist has been added to your Spotify account");
    });
  };

  const handlePlaylistNameChange = (name) => {
    setPlaylistName(name);
  };

  const showAlert = (message) => {
    setAlert({ visible: true, message });
    setTimeout(() => setAlert({ visible: false, message: "" }), 3000); // hides after 3 secs
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>Spotify Playlist Creator</h1>
      </div>
      <div className="searchbar-section">
        <SearchBar onSearch={performSearch} />
      </div>
      <div className="add-remove-sections">
        <div className="results-section">
          <SearchResults results={results} onAdd={addTrackToPlaylist} /> 
        </div>
        <div className="playlist-section">
          <Playlist 
            playlist={playlist} 
            onRemove={removeTrackFromPlaylist} 
            onNameChange={handlePlaylistNameChange}
            onSave={savePlaylist}
            playlistName={playlistName} 
          />
        </div>
      </div>
      {alert.visible && <Alert message={alert.message}/>}
    </div>
  );
}

export default App;
