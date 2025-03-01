import { useState } from 'react';
import './styles.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-2xl font-bold underline text-red-500">Hello World</h1>
    </>
  );
}

export default App;
