import React from 'react';
import PropTypes from 'prop-types';

const Track = ({ track }) => {
    return (
        <div>
            <h3>{track.name}</h3>
            <p>{track.artist}</p>
            <p>{track.album}</p>
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