import React from 'react';
import './App.css';
import Main from './Components/Main';
import StarWarImg from './Components/StarWarImg';


function App() {
  return (
    <div className="App" >
      <header className="App-header" >
        <StarWarImg />
        <Main />
      </header>
    </div>
  );
}

export default App;
