import { useEffect, useState } from 'react';

interface GalleryImage {
  url: string;
  caption: string;
}

export default function PhotoGallery() {
  const [imageUrls, setImageUrls] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const photoModules = import.meta.glob('../photos/*.{jpg,jpeg,png,webp,gif}', { eager: true }) as Record<string, { default: string }>;

        const loadedUrls: GalleryImage[] = Object.keys(photoModules).map((path) => ({
          url: photoModules[path].default,
          caption: path.split('/').pop()?.split('.').slice(0, -1).join('.') ?? 'Image',
        }));

        setImageUrls(loadedUrls);
      } catch (err) {
        console.error('Error discovering images:', err);
        setError('Failed to load gallery configuration.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadImages();
  }, []);

  if (isLoading) return <div className="text-center py-16 text-lg text-gray-600">Loading Gallery...</div>;
  if (error) return <div className="text-center py-16 text-lg text-red-600">{error}</div>;
  if (imageUrls.length === 0 && !isLoading) return <div className="text-center py-16 text-lg text-gray-500">No images found.</div>;

  return (
    <div id="photo" className="max-w-screen-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-[#001b5e] mb-10">Photo Gallery</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {imageUrls.map((imgData, index) => (
          <div key={`${imgData.caption}-${index}`} className="mb-4 group overflow-hidden rounded bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-200">
            <img src={imgData.url} alt={imgData.caption || `Gallery image ${index + 1}`} loading="lazy" className="block w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105" />
          </div>
        ))}
      </div>
    </div>
  );
}