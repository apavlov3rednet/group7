import React, { useEffect, useState } from 'react';
import './App.css';

const serverAddr = 'http://localhost:8000/';

function App() {

  const [data, setData] = useState({
    path: "",
    links: [],
    form: []
  });

  useEffect(
    () => {
      fetch(serverAddr) //Обращение к серверу
      .then(res => res.json()) //Подготовка данных от сервера в формате json
      .then(
        (result) => { //response
          setData(result);
        },
        (error) => { //rejected
          console.log("Error request to server: " + error);
        }
      )
    }
  );

  return (
    <div className="App">

    </div>
  );
}

export default App;
