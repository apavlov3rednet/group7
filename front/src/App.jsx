import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';

const serverAddr = 'http://localhost:8000/';

function App() {
  const [data, setData] = useState(null);
  const [menu, setMenu] = useState(null);

  const fetchServer = useCallback(async () => {
    const response = await fetch(serverAddr);
    const dataServer = await response.json();

    setMenu(dataServer.menu);
    setData(dataServer.table);
  }, []);

  useEffect(
    () => {
      fetchServer();
    }, [fetchServer]
  )

  return (
    <div className="App">
      <Header menu= {menu}/>
    </div>
  );
}

export default App;
