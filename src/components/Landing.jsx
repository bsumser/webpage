import { useState } from 'react';
import Sidenav from './Sidenav';
import Main from './Main';
import Work from './Work';
import Projects from './Projects';
import Photo from './Photo';

const Landing = () => {

  return (
    <div>
      <Sidenav />
      <Main />
      <Work />
      <Projects />
    </div>
  );
}

export default Landing;
