declare module 'react-image-gallery' {
  import type { ComponentType, CSSProperties } from 'react';

  interface GalleryItem {
    original: string;
    thumbnail: string;
    originalAlt?: string;
    thumbnailAlt?: string;
  }

  interface ImageGalleryProps {
    items: GalleryItem[];
    lazyLoad?: boolean;
    showPlayButton?: boolean;
    showFullscreenButton?: boolean;
    useBrowserFullscreen?: boolean;
  }

  const ImageGallery: ComponentType<ImageGalleryProps>;
  export default ImageGallery;
}
