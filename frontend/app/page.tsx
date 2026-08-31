'use client';
import Sidenav from '@/components/layout/Sidenav';
import Crossword from '@/components/puzzles/Crossword';
import Main from '@/components/layout/Main';
import Work from '@/components/layout/Work';
import Projects from '@/components/projects/Projects';
import Photo from '@/components/photo/Photo';

export default function Landing() {
  return (
    <div>
      <Sidenav />
      <Main />
      <Work />
      <Projects />
      <Photo />
    </div>
  );
}
