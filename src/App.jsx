import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Panel from './components/Panel/Panel';
import { initialize } from './initialize';

function App() {
  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className='container'>
      <NavBar />
      <Panel />
    </div>
  );
}

export default App;
