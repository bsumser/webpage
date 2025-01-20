import React, { useState } from 'react';

const MTG = (props) => {
  const [deck, setDeck] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Fetch new deck data based on user input
    fetch('http://localhost:8080/deck?' + inputValue)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDeck(data); // Update the deck state with the fetched data
      })
      .catch((err) => {
        console.log(err.message);
      });

    console.log(inputValue);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MTG Deck</label>
        <textarea value={inputValue} onChange={handleInputChange} id="message" rows="4" columns="40" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        <hr />
        <button type="submit">Enter Deck</button>
      </form>
      {deck && (
        <div>
          <h2>Deck Data:</h2>
          <pre>{JSON.stringify(deck, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MTG;