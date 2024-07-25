import React, { useState, useEffect } from 'react';

const MTG = (props: Props) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch('http://localhost:8080/deck?'+ inputValue)
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
       })
       .catch((err) => {
          console.log(err.message);
       });

    console.log(inputValue);
  }
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
    </div>
    )
}

export default MTG
