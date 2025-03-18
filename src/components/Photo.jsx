import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const Photo = () => {
  const [images, setImages] = useState([]);

  // Function to dynamically import images from a directory
  useEffect(() => {
    // Import all images in the 'photos' directory
    const importImages = async () => {
      const imageFiles = import.meta.glob('../photos/*.jpg');  // Adjust the path as per your folder
      const imageArray = [];

      for (const path in imageFiles) {
        const imageModule = await imageFiles[path]();
        imageArray.push({
          original: imageModule.default,   // The actual image URL after Vite processes the import
          thumbnail: imageModule.default, // You can change this to another image if you have specific thumbnails
        });
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
