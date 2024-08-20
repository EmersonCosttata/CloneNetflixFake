import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Netflix from './components/Netflix';
import NotFound from './components/NotFound';
import { useEffect } from 'react';
import { useAuth } from './components/contetx/AuthContext';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route path="/home" element={<ProtectedRoute component={<Home />} isAuthenticated={isAuthenticated} />} />
        <Route path="/browser" element={<ProtectedRoute component={<Netflix />} isAuthenticated={isAuthenticated} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function ProtectedRoute({ component, isAuthenticated }) {
const navigate = useNavigate()
 
  useEffect(() => {
    if (!isAuthenticated) 
      navigate('/');
  }, [isAuthenticated, navigate])
return isAuthenticated ? component : null

}

export default App;
