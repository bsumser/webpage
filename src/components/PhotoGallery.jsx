import React, { useEffect, useState } from "react";

const PhotoGallery = () => {
  const [images, setImages] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    // Define your image file names
    const imageFiles = [
      "DSCF1082.jpg",
      "DSCF1149.jpg",
      "DSCF1181.jpg",
      "DSCF1219.jpg",
      "DSCF1230.jpg",
      "DSCF1231.jpg",
      "DSCF1254.jpg",
      "DSCF1276.jpg",
      "DSCF1279.jpg",
      "DSCF1368.jpg",
      "DSCF1452.jpg",
      "DSCF1572.jpg",
      "DSCF1655.jpg",
      "DSCF1656.jpg",
      "DSCF1674.jpg",
      "DSCF3440.jpg",
      "DSCF3471.jpg",
      "DSCF3479.jpg",
      "DSCF3480.jpg",
      "DSCF3487.jpg",
      "DSCF3553.jpg",
    ];

    const imageArray = imageFiles.map((fileName) => ({
      src: `/photos/${fileName}`, // Path relative to the public folder
      thumbnail: `/photos/${fileName}`,
      thumbnailWidth: 320,
      thumbnailHeight: 200,
      caption: fileName,
    }));

    setImages(imageArray);
  }, []);

  const openModal = (imageSrc) => {
    setLargeImage(imageSrc);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setLargeImage(null);
  };

  return (
    <div id="photo" className="w-full m-auto p-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#001b5e]">Photo Gallery</h1>

      {/* Masonry-like grid with responsive adjustments */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.src} className="relative group">
            <img
              src={image.thumbnail}
              alt={image.caption}
              width={image.thumbnailWidth}
              height={image.thumbnailHeight}
              className="w-full h-auto object-cover cursor-pointer transition-all duration-300 ease-in-out transform group-hover:scale-105"
              onClick={() => openModal(image.src)} // Click handler to open modal
            />
          </div>
        ))}
      </div>

      {/* Modal for displaying large images */}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative bg-white p-4 max-w-full">
            <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={largeImage}
              alt="Large"
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
