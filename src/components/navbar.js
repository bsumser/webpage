import { NavLink } from 'react-router-dom'
import React from "react";
import "../App.css"

const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="/">Home</a>
      <a href="https://github.com/bsumser">GitHub</a>
      <NavLink to ="/aoc-hub">AoC</NavLink>
      <NavLink to ="/photo">Photos</NavLink>
      <a href="mailto:bsumser@gmail.com">Contact</a>
    </div>
  );
};

export default Navbar