import { useEffect, useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
}

export default function Photo() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const importImages = async () => {
      const photoFiles = import.meta.glob('../photos/*.{jpg,jpeg,png,webp}', { eager: true }) as Record<string, { default: string }>;

      const imageArray = Object.keys(photoFiles).map((path) => ({
        src: photoFiles[path].default,
        alt: path.split('/').pop() ?? 'gallery-image',
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <img key={`${image.alt}-${index}`} src={image.src} alt={image.alt} className="w-full h-auto rounded-lg shadow-md object-cover" loading="lazy" />
          ))}
        </div>
      ) : (
        <p className="text-center">No photos found in directory.</p>
      )}
    </div>
  );
}