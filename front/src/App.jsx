import './App.css';
import Form from './components/form/Form.jsx';
import Header from './components/header/Header.jsx';
import Table from './components/table/Table.jsx';


function App() {
  return (
    <div className="App">
      <Header />

      <div className="container">
        <Form nameForm='Brands' />
        <Table nameTable='Brands' />
      </div>
    </div>
  );
}

export default App;
