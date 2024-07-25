import React, { useState, useEffect } from 'react';

const MTG = (props: Props) => {
    //const [posts, setPosts] = useState([]);
    const [deckText, setDeckText] = useState('');
    //useEffect(() => {
    //   fetch('http://localhost:8080/deck?deck=4%20Forest')
    //      .then((response) => response.json())
    //      .then((data) => {
    //         console.log(data);
    //      })
    //      .catch((err) => {
    //         console.log(err.message);
    //      });
    //}, []);
  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    // You can pass formData as a fetch body directly:
    fetch('/some-api', { method: form.method, body: formData });
    fetch('http://localhost:8080/', { method: form.method, body: formData })
       .then((response) => response.json())
       .then((data) => {
          console.log(data);
       })
       .catch((err) => {
          console.log(err.message);
       });

    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
     return (
    <div>
         <h1>MTG TEST SITE</h1>
         <form method="post" onSubmit={handleSubmit}>
      <label>
        <textarea
          name="postContent"
          defaultValue="Enter deck here"
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
