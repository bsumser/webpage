import React, { useState } from 'react';
import DeckComponent from './DeckComponent'; // Import DeckComponent

const MTG = () => {
  const [deckData, setDeckData] = useState([]); // Renamed for clarity: deckData holds the array
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(null); // Added state for error handling
  const [loading, setLoading] = useState(false); // Added state for loading indicator

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(null); // Clear previous errors

    fetch('https://api.bsumser.dev/mtg/deck?deck=' + encodeURIComponent(inputValue))
      .then((response) => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.error || `API error: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data from API:", data);

        if (typeof data === 'object' && data !== null && Array.isArray(data.deck)) {
          setDeckData(data.deck); // Correct: Update the 'deckData' state with the array
        } else {
          console.error(`Invalid deck data received:`, data);
          setError(new Error("Invalid deck data format from API.")); // Set a user-friendly error
          setDeckData([]); // Clear any previous deck data on error
        }
      })
      .catch((err) => {
        console.error(`Fetch error: ${err.message}`);
        setError(err); // Store the error message
        setDeckData([]); // Clear any previous deck data on error
      })
      .finally(() => {
        setLoading(false); // Stop loading regardless of success or failure
      });
  };

  return (
    <div className="flex-col items-center justify-center bg-gray-500">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          MTG Deck
        </label>
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          id="message"
          rows="30"
          cols="100"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter deck query here..."
        ></textarea>
        <hr />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Fetching...' : 'Fetch Deck'} {/* Show loading text */}
        </button>
      </form>
      <div className="flex items-center justify-center">
        {/* Render error message if there's an error */}
        {error && <p className="text-red-500 mt-4">Error: {error.message}</p>}

        {/* Render DeckComponent if deckData is not empty and no error */}
        {deckData.length > 0 && !error && <DeckComponent deck={deckData} />}
      </div>
    </div>
  );
};

export default MTG;
