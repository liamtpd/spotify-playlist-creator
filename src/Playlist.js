import React from 'react';
import Track from './Track';
import PropTypes from 'prop-types';

const Playlist = ({ playlist, onRemove, onNameChange, onSave, playlistName }) => {
    const handleNameChange = (e) => {
        onNameChange(e.target.value);
    };
    return (
        <div>
            <h2>Playlist:</h2>
            <input
                type="text"
                value={playlistName}
                placeholder="Enter playlist name"
                onChange={handleNameChange}
            />
            <button onClick={onSave}>Save Playlist</button>
            <ul>
                {playlist.map((track, index) => 
                    <li key={track.uniqueId}> {/* adding index to mapping to create unique id's for tracks once added to playlist, this is done to account for the same track being added to playlist more than once */}
                        <Track track={track} />
                        <button onClick={() => onRemove(track.uniqueId)}>Remove</button>
                    </li>
                )}
            </ul>
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