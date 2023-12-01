import { useEffect, useState } from 'react';
import { useRef } from 'react';


export default function Test() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/message")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}