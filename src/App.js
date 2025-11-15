import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import './index.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <AppRouter />
        {/* Bottom Navigation (Εμφανίζεται σε όλες τις σελίδες) */}
        <nav className="bottom-nav">
          <a href="/"><span className="material-icons">home</span></a>
          <a href="/search"><span className="material-icons">search</span></a>
          <a href="/profile"><span className="material-icons">person</span></a>
        </nav>
      </div>
    </Router>
  );
}

export default App;