import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Navigate, Routes  } from 'react-router-dom';
import LoginPage from './components/loginPage';
import FileUpload from './components/fileUpload';
import SignupPage from './components/signupPage';

import './App.css';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('loginToken')}`;

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
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default App;
