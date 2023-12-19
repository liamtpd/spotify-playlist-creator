// SearchResults.js is responsible for rendering the search results and inherits how to display each track item from `Track.js`
import React from 'react';
import Track from './Track';
import PropTypes from 'prop-types';
import './SearchResults.css';

const SearchResults = ({ results, onAdd }) => {
    return (
        <div className="search-results-component">
            <ul>
                <h2>Results:</h2>
                {/* The below maps over the results passed into the `SearchResults` component & renders them based */}
                {results.map(track => 
                    <li key={track.id} className="track-item">
                        <Track track={track} />
                        <button onClick={() => onAdd(track.id)} className="add-track-button">+</button> {/*renders an 'Add' button under each track, which uses '`addTrackToPlaylist` function passed down from `App` through `onAdd` prop*/}
                    </li>
                )}
            </ul>
        </div>
    );
};

SearchResults.propTypes = {
    results: PropTypes.arrayOf(PropTypes.object),
};

SearchResults.defaultProps = {
    results: [],
};  

export default SearchResults;