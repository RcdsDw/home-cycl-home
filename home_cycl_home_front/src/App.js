import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './containers/auth/Auth';
import Dashboard from './containers/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
