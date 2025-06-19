import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

// --- Configuration for Masonry ---
const breakpointColumnsObj = {
 default: 4,
 1280: 3,
 1024: 3,
 768: 2,
 500: 1
};

// Helper function for captions (optional) - remains the same
function getCaptionFromPath(path) {
  // Adjusted to remove the 'thumbnails/' part for cleaner captions if needed
  const filename = path.split('/').pop() || '';
  const namePart = filename.split('.').slice(0, -1).join('.');
  let caption = namePart.replace(/[-_]/g, ' ');
  return caption.charAt(0).toUpperCase() + caption.slice(1);
}

const PhotoGallery = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- CHANGED: Point to the 'thumbnails' directory ---
        const imageModules = import.meta.glob('../thumbnails/*.{jpg,jpeg,png,webp,gif}');
        const loadedUrls = [];

        for (const path in imageModules) {
          try {
            const module = await imageModules[path]();
            // When clicking on a thumbnail, you'll still want to open the full-size image.
            // We derive the full image path from the thumbnail path.
            const fullSizePath = module.default.replace('/thumbnails/', '/photos/');

            loadedUrls.push({
              url: module.default, // This is the thumbnail URL for display
              fullUrl: fullSizePath, // This is the full-size image URL for opening
              caption: getCaptionFromPath(path)
            });
          } catch (imgLoadErr) {
             console.error(`Failed to load module for ${path}:`, imgLoadErr);
          }
        }
        setImageUrls(loadedUrls);
      } catch (err) {
        console.error("Error discovering images:", err);
        setError("Failed to load gallery configuration.");
      } finally {
        setIsLoading(false);
      }
    };
    loadImages();
  }, []);

  // --- Click Handler Function ---
  // CHANGED: Now uses imgData.fullUrl to open the full-size image
  const handleImageClick = (fullUrl) => {
    window.open(fullUrl, '_blank', 'noopener,noreferrer'); // Opens URL in a new tab safely
  };

  // --- Render Logic ---
  if (isLoading) return (
    <div className="text-center py-16 text-lg text-gray-600">
      Loading Gallery...
    </div>
  );
  if (error) return (
    <div className="text-center py-16 text-lg text-red-600">
      {error}
    </div>
  );
  if (imageUrls.length === 0 && !isLoading) return (
    <div className="text-center py-16 text-lg text-gray-500">
      No images found.
    </div>
  );

  return (
    <div id="photo" className="max-w-screen-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-[#001b5e] mb-10">
        Photo Gallery
      </h1>

      {/* Reminder for global CSS for react-masonry-css */}
      {/* ... (ensure .my-masonry-grid and .my-masonry-grid_column styles are present) ... */}

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {imageUrls.map((imgData, index) => (
          <div
            key={index}
            className="mb-4 group overflow-hidden rounded bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            // CHANGED: Pass imgData.fullUrl to the click handler
            onClick={() => handleImageClick(imgData.fullUrl)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                // CHANGED: Pass imgData.fullUrl to the click handler
                handleImageClick(imgData.fullUrl);
              }
            }}
            aria-label={`View image ${imgData.caption || index + 1} in new tab`}
          >
            <img
              // This src is now the thumbnail URL
              src={imgData.url}
              alt={imgData.caption || `Gallery image ${index + 1}`}
              loading="lazy"
              className="block w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            {/* Optional caption */}
            {/* <p className="p-2 text-xs text-center text-gray-700">{imgData.caption}</p> */}
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default PhotoGallery;