import { useEffect, useState } from 'react';
import SEO from './SEO';

interface GalleryImage {
  thumbnailUrl: string;
  fullUrl: string;
  caption: string;
}

interface ViewerState {
  isOpen: boolean;
  imageUrl: string | null;
  caption: string;
}

export default function PhotoGallery() {
  const [imageUrls, setImageUrls] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewer, setViewer] = useState<ViewerState>({ isOpen: false, imageUrl: null, caption: '' });

  useEffect(() => {
    const loadImages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const photoModules = import.meta.glob('../photos/*.{jpg,jpeg,png,webp,gif}', { eager: true }) as Record<string, { default: string }>;
        const thumbnailModules = import.meta.glob('../thumbnails/*.{jpg,jpeg,png,webp,gif}', { eager: true }) as Record<string, { default: string }>;

        const loadedUrls: GalleryImage[] = Object.keys(photoModules).map((path) => {
          const filename = path.split('/').pop() ?? '';
          const thumbnailPath = path.replace('/photos/', '/thumbnails/');
          const matchingThumbnail = thumbnailModules[thumbnailPath] ?? thumbnailModules[thumbnailPath.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '.jpg')] ?? null;

          return {
            thumbnailUrl: matchingThumbnail?.default ?? photoModules[path].default,
            fullUrl: photoModules[path].default,
            caption: filename.split('.').slice(0, -1).join('.') ?? 'Image',
          };
        });

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

  const openViewer = (image: GalleryImage) => {
    setViewer({ isOpen: true, imageUrl: image.fullUrl, caption: image.caption });
  };

  const closeViewer = () => {
    setViewer({ isOpen: false, imageUrl: null, caption: '' });
  };

  return (
    <div>
      <SEO 
          title="Photo Gallery" 
          description="A gallery of photos." 
          canonical="https://tsumser.jp/photo"
      />
      <div id="photo" className="max-w-screen-2xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-[#001b5e] mb-10">Photo Gallery</h1>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {imageUrls.map((imgData, index) => (
            <button
              key={`${imgData.caption}-${index}`}
              type="button"
              onClick={() => openViewer(imgData)}
              className="group mb-4 block w-full overflow-hidden rounded-xl bg-gray-100 text-left shadow-md transition duration-200 hover:shadow-xl"
            >
              <img
                src={imgData.thumbnailUrl}
                alt={imgData.caption || `Gallery image ${index + 1}`}
                loading="lazy"
                className="block w-full h-auto object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </button>
          ))}
        </div>

        {viewer.isOpen && viewer.imageUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={closeViewer}>
            <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
              <button type="button" onClick={closeViewer} className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-gray-800 shadow hover:bg-white">
                Close
              </button>
              <img src={viewer.imageUrl} alt={viewer.caption} className="max-h-[90vh] w-full object-contain" />
              <div className="bg-white px-4 py-3 text-center text-sm font-medium text-gray-700">{viewer.caption}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}