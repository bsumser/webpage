import React from 'react'
import Navbar from "./navbar"

const Home = () => {
    return (
      <div className = "grid">
      <Navbar>
      </Navbar>
        <div className = "content">
          <h1>Brett Sumser</h1>
          <p>Write about yourself.</p>
      
      
          <h1>Contact</h1>
          <p>b</p>
      
      
          <h1>Personal Projects</h1>
        </div>
        <div className = "right-margin">Text</div>
      </div>
    );
}

export default Home