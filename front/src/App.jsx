import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';

const serverAddr = 'http://localhost:8000/';

function App() {
  const [data, setData] = useState(null);
  const [menu, setMenu] = useState(null);

  useEffect(
    () => {
      if(!data && !menu) {
        fetch(serverAddr)
        .then( res => res.json() )
        .then(
          res => {
            setMenu(res.menu);
          },
          error => {
            console.log(error);
          }
        )
      }
    }
  )

  return (
    <div className="App">
      <Header menu= {menu}/>
    </div>
  );
}

export default App;
