import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/image-gallery.css';

interface GalleryImage {
  original: string;
  thumbnail: string;
  originalAlt: string;
  thumbnailAlt: string;
}

export default function Photo() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const importImages = async () => {
      const photoFiles = import.meta.glob('../photos/*.{jpg,jpeg,png,webp}', { eager: true }) as Record<string, { default: string }>;

      const imageArray = Object.keys(photoFiles).map((path) => ({
        original: photoFiles[path].default,
        thumbnail: photoFiles[path].default,
        originalAlt: path.split('/').pop() ?? 'gallery-image',
        thumbnailAlt: path.split('/').pop() ?? 'gallery-image',
      }));

      setImages(imageArray);
      setLoading(false);
    };

    void importImages();
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
          useBrowserFullscreen={false}
        />
      ) : (
        <p className="text-center">No photos found in directory.</p>
      )}
    </div>
  );
}