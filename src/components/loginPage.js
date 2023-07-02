import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setError('Please enter both username and password.');
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
          username,
          password,
        });

        console.log(response);

        if (response.data.success) {
          // Save the login token in localStorage
          localStorage.setItem('loginToken', response.data.token);

          // If login is successful, redirect to the user page
          window.location.href = '/';
        } else {
          setError('Invalid username or password.');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred during login. Please try again later.');
      }
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default LoginPage;