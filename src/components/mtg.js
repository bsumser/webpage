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
  function onDeckTextChange(e){
    setDeckText(e.target.value);
  }
     return (
    <div>
         <h1>MTG TEST SITE</h1>
          <input type="text" value={deckText} onChange={onDeckTextChange}/>
    </div>
    )
}

export default MTG
