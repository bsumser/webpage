import Sidenav from './Sidenav.tsx';
import Main from './Main.tsx';
import Work from './Work.tsx';
import Projects from './Projects.tsx';
import Photo from './Photo.tsx';

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