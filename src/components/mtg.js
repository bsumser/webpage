import React, { useState, useEffect } from 'react';


const MTG = () => {
    //const [posts, setPosts] = useState([]);
    useEffect(() => {
       fetch('http://localhost:8080/deck?deck=Forest')
          .then((response) => response.json())
          .then((data) => {
             console.log(data);
          })
          .catch((err) => {
             console.log(err.message);
          });
    }, []);
     return (
         <h1>MTG TEST SITE</h1>
    )
}

export default MTG