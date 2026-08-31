import Sidenav from './Sidenav.tsx';
import Main from './Main.tsx';
import Work from './Work.tsx';
import Projects from './Projects.tsx';
import Photo from './Photo.tsx';
import SEO from './SEO.tsx';

export default function Landing() {
  return (
    <div>
      <SEO 
        title="Home" 
        description="Software engineer portfolio of Thomas Sumser, specializing in web development, Go, and React." 
      />
      <Sidenav />
      <Main />
      <Work />
      <Projects />
      <Photo />
    </div>
  );
}