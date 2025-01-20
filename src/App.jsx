import { useState } from 'react'
import Sidenav from './components/Sidenav'
import Main from './components/Main'
import Work from './components/Work'
import Projects from './components/Projects'
import MTG from './components/MTG'

function App() {

  return (
    <div>
        <Sidenav />
        <Main />
        <Work />
        <Projects />
        <MTG />
    </div>
  )
}

export default App
