import React, { useState } from 'react';
import DeckComponent from './DeckComponent'; // Import DeckComponent

const MTG = () => {
  const [deck, setDeck] = useState([]);   // Initialize deck as an empty array
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);   // Set the input string
  };

  const handleSubmit = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Fetch new deck data based on user input
    // CORRECTED: Add 'deck=' to the query string and encodeURIComponent
    fetch('https://api.bsumser.dev/deck?deck=' + encodeURIComponent(inputValue))
      .then((response) => {
        // Check if the response is OK (2xx status code)
        if (!response.ok) {
            // If not OK, read the error message from the response body
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Unknown API error');
            });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Received data from API:", data); // Log the full data for debugging

        // --- CHANGE STARTS HERE ---
        // Check if 'data' is an object and if it contains a 'deck' property that is an array
        if (typeof data === 'object' && data !== null && Array.isArray(data.deck)) {
          setDeck(data.deck); // Set the fetched deck array (from the 'deck' property)
        } else {
          // Log the actual data for better debugging if it's still not as expected
          console.error(`Invalid deck data received:`, data); 
        }
        // --- CHANGE ENDS HERE ---
      })
      .catch((err) => {
        console.error(`Fetch error: ${err.message}`); // Use console.error for actual errors
        // You might want to update some state here to show the error to the user
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
        >
          Fetch Deck
        </button>
      </form>
      <div className="flex items-center justify-center">
        {/* Render DeckComponent if deck data is available */}
        {deck.length > 0 && <DeckComponent deck={deck} />}
      </div>
    </div>
  );
};

export default MTG;
