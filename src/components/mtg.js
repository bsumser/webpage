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
      <h1>MTG TEST SITE</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter text here..."
            rows={4}
            cols={40}
          />
        </label>
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