import { BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import { Routes } from './Routes';

function App() {
  return (
    <div className="app">
      <section className="app-main">
        <Router>
          <Routes />
        </Router>
      </section>
    </div>
  );
}

export default App;
