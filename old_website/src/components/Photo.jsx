import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Photo = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const importImages = async () => {
      // 1. Grab both the high-res and the tiny nav-thumbnails
      const fullSizeFiles = import.meta.glob('../photos/*.{jpg,jpeg,png,webp}', { eager: true });
      const thumbFiles = import.meta.glob('../thumbnails/*.{jpg,jpeg,png,webp}', { eager: true });

      const imageArray = Object.keys(fullSizeFiles).map((path) => {
        // Find the matching thumbnail by replacing the folder name in the path
        const thumbPath = path.replace('/photos/', '/thumbnails/');
        
        return {
          original: fullSizeFiles[path].default,
          // Fallback to original if the specific nav-thumbnail is missing
          thumbnail: thumbFiles[thumbPath]?.default || fullSizeFiles[path].default,
          originalAlt: path.split('/').pop(),
          thumbnailAlt: 'Thumbnail',
        };
      });

      setImages(imageArray);
      setLoading(false);
    };

    importImages();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div id="photo" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e] mb-8">Photo Portfolio</h1>
      {images.length > 0 ? (
        <ImageGallery 
          items={images} 
          lazyLoad={true} 
          showPlayButton={false}
          showFullscreenButton={true}
          useBrowserFullscreen={false} // Keeps it contained in your styled div
        />
      ) : (
        <p className="text-center">No photos found in directory.</p>
      )}
    </div>
  );
};

export default Photo;