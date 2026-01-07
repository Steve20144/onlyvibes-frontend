import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { validateSession } from './api/auth';

function App() {
  validateSession(); 
  return (
    <Router>
      <div className="App">
        <AppRouter />
      </div>
    </Router>
  );
}

export default App;