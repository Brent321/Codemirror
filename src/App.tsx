import { useState } from 'react';
//import './App.css';
import { Editor } from './Editor';

function App() {
  const [code, setCode] = useState('');
  const btnClicked = () => {

  }

  return (
    <div className="App">
      <Editor setCode={setCode} />
      <button onClick={ btnClicked} />
    </div>
  );
}

export default App;
