declare module 'react-masonry-css' {
  import type { ComponentType, CSSProperties } from 'react';

  interface MasonryProps {
    breakpointCols: Record<string | number, number>;
    className?: string;
    columnClassName?: string;
    children?: React.ReactNode;
  }

  const Masonry: ComponentType<MasonryProps>;
  export default Masonry;
}
