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
                const imageModules = import.meta.glob('../photos/*.{jpg,jpeg,png,webp,gif}');
                const loadedUrls = [];

                for (const path in imageModules) {
                    try {
                        const module = await imageModules[path]();
                        loadedUrls.push({
                            url: module.default,
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
    const handleImageClick = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer'); // Opens URL in a new tab safely
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
                    // Add onClick handler and cursor directly to this div
                    <div
                        key={index}
                        className="mb-4 group overflow-hidden rounded bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer" // <-- Added cursor-pointer
                        onClick={() => handleImageClick(imgData.url)} // <-- Added onClick
                        role="button" // <-- Added role for accessibility
                        tabIndex={0} // <-- Make it focusable for keyboard users
                        onKeyDown={(e) => { // <-- Allow activation with Enter/Space
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleImageClick(imgData.url);
                            }
                        }}
                        aria-label={`View image ${imgData.caption || index + 1} in new tab`} // Accessibility label
                    >
                        {/* Image remains the direct child content */}
                        <img
                            src={imgData.url}
                            alt={imgData.caption || `Gallery image ${index + 1}`} // Alt text is still important
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