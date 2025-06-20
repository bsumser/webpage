import { useState } from 'react';
import Landing from './components/Landing';
import MTG from './components/MTG';
import Now from './components/Now';
import PhotoGallery from './components/PhotoGallery';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mtg" element={<MTG />} />
        <Route path="/photo" element={<PhotoGallery />} />
        <Route path="/now" element={<Now />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
