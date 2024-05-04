import { NavLink } from 'react-router-dom'
import "../App.css"

const Navbar = () => {
  return (
    <nav className='navbar'>
        <nav className='container'>
            <div className='home-nav'>
                <a href="/">Home</a>
            </div>
            <div className="nav-elements">
                <ul>
                  <li><a href="https://github.com/bsumser">github</a></li>
                  <li><NavLink to ="/aoc-hub">aoc</NavLink></li>
                  <li><a href="mailto:bsumser@gmail.com">contact</a></li>
                  <li><NavLink to ="/photo">photo</NavLink></li>
                </ul>
            </div>
        </nav>
    </nav>
  )
}

export default Navbar