import { useState } from 'react';
import Landing from './components/Landing';
import MTG from './components/MTG';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mtg" element={<MTG />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
