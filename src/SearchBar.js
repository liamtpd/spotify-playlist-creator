// SearchBar.js maintains the user input state, handles changes to the input (`handleChange`), and handles the form submission, 
// passing the user input back up to the App component by calling the `onSearch` prop with `userInput` as the argument.
import React, { useState } from "react";
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [userInput, setUserInput] = useState("");
    const handleChange = (e) => { // updates the state with the user's input
        setUserInput(e.target.value);
    };
    const handleSubmit =(e) => { // handles submission of the form
        e.preventDefault(); // Prevents page from reload on form submission
        onSearch(userInput); // Executes the search (form submission), connected through prop to `performSearch` in `App`
        setUserInput(""); // Resets the input field after search executes
    };
    return (
        <form onSubmit={handleSubmit} className="search-section">
            <label>
                <input 
                    onChange={handleChange} 
                    type="text" 
                    value={userInput} 
                    placeholder="Enter a song, artist, or album"
                    className="search-field"
                />
            </label>
            <input 
                type="submit" 
                value="SEARCH" 
                className="search-button"
            />
        </form>
    );
}

export default SearchBar;