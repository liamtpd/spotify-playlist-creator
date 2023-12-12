// SearchResults.js is responsible for rendering the search 
import React from 'react';
import Track from './Track';
import PropTypes from 'prop-types';

const SearchResults = ({ results, onAdd }) => {
    return (
        <div>
            <h2>Search Results:</h2>
            <ul>
                {/* The below maps over the results passed into the `SearchResults` component & renders them based */}
                {results.map(track => 
                    <li key={track.id}>
                        <Track track={track} />
                        <button onClick={() => onAdd(track.id)}>Add</button> {/*renders an 'Add' button under each track, which uses '`addTrackToPlaylist` function passed down from `App` through `onAdd` prop*/}
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