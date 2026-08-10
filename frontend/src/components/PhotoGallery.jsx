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

function getCaptionFromPath(path) {
  // Adjusted to remove the directory part for cleaner captions
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
                // Import ALL thumbnail modules eagerly
                const thumbnailModules = import.meta.glob('../thumbnails/*.{jpg,jpeg,png,webp,gif}', { eager: true });
                // Import ALL full-size photo modules eagerly
                const photoModules = import.meta.glob('../photos/*.{jpg,jpeg,png,webp,gif}', { eager: true });

                const loadedUrls = [];

                for (const thumbPath in thumbnailModules) {
                    try {
                        const thumbnailModule = thumbnailModules[thumbPath];
                        const thumbnailUrl = thumbnailModule.default;

                        // Derive the corresponding full-size photo path
                        // Example: '../thumbnails/image1.jpg' -> '../photos/image1.jpg'
                        const photoPath = thumbPath.replace('/thumbnails/', '/photos/');

                        const fullPhotoModule = photoModules[photoPath];

                        if (fullPhotoModule) {
                            const fullPhotoUrl = fullPhotoModule.default;
                            loadedUrls.push({
                                url: thumbnailUrl, // Thumbnail for display
                                fullUrl: fullPhotoUrl, // Full-size image for opening
                                caption: getCaptionFromPath(thumbPath)
                            });
                        } else {
                            console.warn(`No matching full-size photo found for thumbnail: ${thumbPath}`);
                        }

                    } catch (imgLoadErr) {
                        console.error(`Failed to load module for ${thumbPath}:`, imgLoadErr);
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

    const handleImageClick = (fullUrl) => {
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

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
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {imageUrls.map((imgData, index) => (
                    <div
                        key={index}
                        className="mb-4 group overflow-hidden rounded bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                        onClick={() => handleImageClick(imgData.fullUrl)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleImageClick(imgData.fullUrl);
                            }
                        }}
                        aria-label={`View image ${imgData.caption || index + 1} in new tab`}
                    >
                        <img
                            src={imgData.url}
                            alt={imgData.caption || `Gallery image ${index + 1}`}
                            loading="lazy"
                            className="block w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105"
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
};

export default PhotoGallery;