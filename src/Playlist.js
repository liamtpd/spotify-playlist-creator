import React from 'react';
import Track from './Track';
import PropTypes from 'prop-types';
import './Playlist.css';

const Playlist = ({ playlist, onRemove, onNameChange, onSave, playlistName }) => {
    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };
    return (
        <div className="playlist-component">
            <input
                type="text"
                value={playlistName}
                placeholder="Enter playlist name"
                onChange={handleNameChange}
            />
            <ul>
                {playlist.map((track, index) => 
                    <li key={track.uniqueId} className="playlist-track-item"> {/* adding index to mapping to create unique id's for tracks once added to playlist, this is done to account for the same track being added to playlist more than once */}
                        <Track track={track} />
                        <button onClick={() => onRemove(track.uniqueId)} className="remove-track-button">-</button>
                    </li>
                )}
            </ul>
            <button onClick={onSave} className="save-playlist-button">Save to Spotify</button>
        </div>
    );
};

Playlist.propTypes = {
    playlist: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRemove: PropTypes.func.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    playlistName: PropTypes.string.isRequired,
};

export default Playlist;