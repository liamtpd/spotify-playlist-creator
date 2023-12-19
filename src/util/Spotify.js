const clientId = '9f877a7812474280a7e656e6da47b335';
const redirectUri = 'https://grand-snickerdoodle-769768.netlify.app/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) { // First the method is checking if an access token is already set.
      return accessToken;
    }
    // If no token is set, it tries to extract the token (`accessTokenMatch`) and expiration time (`expiresInMatch`) from the URL. This happens after Spotify redirects back to your application.
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); 
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) { // If the token is found in the URL, it's saved and a timer is set to clear it after it expires.
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      // Set a timeout to clear the accessToken after it expires, and redirect for re-authentication
      window.setTimeout(() => {
        window.alert("Your session has expired. Please log in again to continue."); // alert for when accessToken expires
        accessToken = '';
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      }, expiresIn * 1000); // Used to set a timer that clears the accessToken after expiresIn seconds.
      
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else { // If no token is present in the URL, the user is redirected to Spotify’s authorization page.
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=20`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      }));
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
  
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
  
    return fetch('https://api.spotify.com/v1/me', { headers: headers }
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({ name: name })
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris })
        });
      });
    });
  },  
}

export default Spotify;
