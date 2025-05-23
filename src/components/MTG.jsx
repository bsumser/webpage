import React, { useState } from 'react';
import DeckComponent from './DeckComponent'; // Import DeckComponent

const MTG = () => {
  const [deck, setDeck] = useState([]);  // Initialize deck as an empty array
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);  // Set the input string
  };

  const handleSubmit = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Fetch new deck data based on user input
    fetch('https://api.bsumser.dev/deck?' + inputValue)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setDeck(data);  // Set the fetched deck array data
        } else {
          console.error("Invalid deck data received");
        }
      })
      .catch((err) => {
        console.log(err.message);
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
