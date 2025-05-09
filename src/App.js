import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';

function App() {
  const token = localStorage.getItem('authToken');
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/anime/:name"
          element={token ? <AnimeDetail /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;