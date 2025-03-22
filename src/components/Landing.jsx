import { useState } from 'react';
import Sidenav from './Sidenav';
import Main from './Main';
import Work from './Work';
import Projects from './Projects';
import Photo from './Photo';

const Landing = () => {

  return (
    <div>
    <script data-goatcounter="https://bsumser.goatcounter.com/count"
      async src="//gc.zgo.at/count.js"></script>
      <Sidenav />
      <Main />
      <Work />
      <Projects />
      <Photo />
    </div>
  );
}

export default Landing;
