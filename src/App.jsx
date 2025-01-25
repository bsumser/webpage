import { useState } from 'react';
import Sidenav from './components/Sidenav';
import Main from './components/Main';
import Work from './components/Work';
import Projects from './components/Projects';
import Photo from './components/Photo';
import MTG from './components/MTG';
import DeckComponent from './components/DeckComponent'; // Import DeckComponent

function App() {
  const [deck, setDeck] = useState(null);

  // Function to handle deck data from MTG component
  const handleDeckData = (data) => {
    setDeck(data); // Update the deck state
  };

  return (
    <div>
      <Sidenav />
      <Main />
      <Work />
      <Projects />
      <MTG onDeckData={handleDeckData} /> {/* Pass handleDeckData as a prop to MTG */}
      
      {/* Render DeckComponent if deck data is available */}
      {deck && <DeckComponent deck={deck} />}
    </div>
  );
}

export default App;