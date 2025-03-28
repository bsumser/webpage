import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';

// --- Configuration for Masonry ---
// Define how many columns to display at different screen widths
const breakpointColumnsObj = {
  default: 4, // Default number of columns (desktop)
  1280: 3,    // 3 columns between 1100px and 1280px (example)
  1024: 3,    // 3 columns between 700px and 1024px
  768: 2,     // 2 columns between 500px and 768px
  500: 1      // 1 column below 500px
};

// Helper function for captions (optional)
function getCaptionFromPath(path) {
    const filename = path.split('/').pop() || '';
    const namePart = filename.split('.').slice(0, -1).join('.');
    let caption = namePart.replace(/[-_]/g, ' ');
    return caption.charAt(0).toUpperCase() + caption.slice(1);
}

const PhotoGallery = () => {
    const [imageUrls, setImageUrls] = useState([]); // Store just URLs or simple objects
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadImages = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Use import.meta.glob to find images
                const imageModules = import.meta.glob('../photos/*.{jpg,jpeg,png,webp,gif}'); // Adjust path if needed
                const loadedUrls = [];

                for (const path in imageModules) {
                    try {
                        const module = await imageModules[path]();
                        loadedUrls.push({
                            url: module.default,
                            caption: getCaptionFromPath(path) // Keep caption if desired
                        });
                    } catch (imgLoadErr) {
                         console.error(`Failed to load module for ${path}:`, imgLoadErr);
                         // Optionally skip this image or handle error
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

    // --- Render Logic ---
    if (isLoading) return <div className="text-center py-16 text-lg text-gray-600">Loading Gallery...</div>;
    if (error) return <div className="text-center py-16 text-lg text-red-600">{error}</div>;
    if (imageUrls.length === 0) return <div className="text-center py-16 text-lg text-gray-500">No images found.</div>;

    return (
        // Container can be wide as needed
        <div id="photo" className="max-w-screen-2xl mx-auto p-4 py-16 md:px-8">
            <h1 className="text-4xl font-bold text-center text-[#001b5e] mb-10">
                Photo Gallery
            </h1>

            {/* Add required CSS for react-masonry-css */}
            {/* **BEST PRACTICE:** Move this CSS to your global index.css or a PhotoGallery.css file */}
            <style>{`
                .my-masonry-grid {
                  display: -webkit-box; /* Not needed if autoprefixing */
                  display: -ms-flexbox; /* Not needed if autoprefixing */
                  display: flex;
                  margin-left: -16px; /* Adjust based on your column gap -> gutter size */
                  width: auto;
                }
                .my-masonry-grid_column {
                  padding-left: 16px; /* Adjust based on your column gap -> gutter size */
                  background-clip: padding-box;
                }

                /* Style your items */
                .my-masonry-grid_column > div { /* Change 'div' to element type used below */
                  margin-bottom: 16px; /* Adjust gap between items vertically */
                  background: #eee; /* Optional background for items */
                  overflow: hidden; /* Prevent content spill */
                   border-radius: 4px; /* Optional rounding */
                   box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); /* Optional shadow */
                }
                 .my-masonry-grid_column img {
                     display: block; /* Remove extra space below image */
                     width: 100%; /* Make image fill its container */
                     height: auto;
                 }
            `}</style>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"        // Your custom CSS class for the grid container
                columnClassName="my-masonry-grid_column" // Your custom CSS class for the columns
            >
                {/* Array of JSX items */}
                {imageUrls.map((imgData, index) => (
                    <div key={index}> {/* Each child of Masonry is treated as an item */}
                       <img
                            src={imgData.url}
                            alt={imgData.caption || `Gallery image ${index + 1}`}
                            loading="lazy" // Add lazy loading
                        />
                       {/* Optional: Add caption overlay or below image */}
                       {/* <p className="p-2 text-xs text-center">{imgData.caption}</p> */}
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

/* test for digital ocean */

export default PhotoGallery;