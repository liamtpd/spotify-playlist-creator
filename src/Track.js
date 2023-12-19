import React from 'react';
import PropTypes from 'prop-types';
import './Track.css';

const Track = ({ track }) => {
    return (
        <div className="track-component">
            <h5>{track.name}</h5>
            <p>{track.artist} | {track.album}</p>
        </div>
    );
};

Track.propTypes = {
    track: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
        album: PropTypes.string.isRequired,
    }),
};

export default Track;