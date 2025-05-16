import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Photo = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const importImages = async () => {
      // Import full-size images
      const fullSizeImports = import.meta.glob('../photos/DSCF*.jpg');
      // Import thumbnails
      const thumbnailImports = import.meta.glob('../photos/thumb_*.jpg');

      const imageArray = [];

      for (const fullPath in fullSizeImports) {
        const fullName = fullPath.split('/').pop(); // e.g., DSCF1234.jpg
        const thumbName = `thumb_${fullName}`;      // e.g., thumb_DSCF1234.jpg
        const thumbPath = `../photos/${thumbName}`;

        if (thumbnailImports[thumbPath]) {
          const [fullModule, thumbModule] = await Promise.all([
            fullSizeImports[fullPath](),
            thumbnailImports[thumbPath](),
          ]);

          imageArray.push({
            original: fullModule.default,
            thumbnail: thumbModule.default,
          });
        }
      }

      setImages(imageArray);
    };

    importImages();
  }, []);

  return (
    <div id="photo" className="max-w-[1040px] m-auto md:pl-20 p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">Photo</h1>
      {images.length > 0 && <ImageGallery items={images} />}
    </div>
  );
};

export default Photo;
