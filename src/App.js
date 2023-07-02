import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes  } from 'react-router-dom';
import LoginPage from './components/loginPage';
import FileUpload from './components/fileUpload';
import './App.css';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('loginToken');

  return isAuthenticated ? <FileUpload /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
