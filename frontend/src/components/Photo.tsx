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
      const thumbFiles = import.meta.glob('../thumbnails/*.{jpg,jpeg,png,webp}', { eager: true }) as Record<string, { default: string }>;

      // Build a lookup of filename -> thumbnail src
      const thumbByName = new Map<string, string>();
      for (const path of Object.keys(thumbFiles)) {
        const name = path.split('/').pop() ?? '';
        thumbByName.set(name, thumbFiles[path].default);
      }

      const imageArray = Object.keys(photoFiles).map((path) => {
        const name = path.split('/').pop() ?? 'gallery-image';
        return {
          original: photoFiles[path].default,
          // fall back to the full image if no matching thumbnail is found
          thumbnail: thumbByName.get(name) ?? photoFiles[path].default,
          originalAlt: name,
          thumbnailAlt: name,
        };
      });

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