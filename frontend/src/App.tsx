import Landing from './components/Landing.tsx';
import MTG from './components/MTG.tsx';
import Now from './components/Now.tsx';
import PhotoGallery from './components/PhotoGallery.tsx';
import { BrowserRouter, Routes, Route } from "react-router";

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
