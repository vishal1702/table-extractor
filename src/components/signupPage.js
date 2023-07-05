import React, { useState } from "react";
import Header from "./header";
import axios from "axios";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value || "");
  }

  const handlephoneChange = (e) => {
    setphone(e.target.value || "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return;
    }

    const payload = {
      username,
      password,
      email,
      phone,
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`,  payload ,
      {
        headers: {
          "Authorization": "",
        }
      }
      );
      console.log("Signup successful:", response.data);

      if (response.status === 400) {
        setError("Username already exists");
      } 
      // Handle successful signup, e.g., redirect to another page
    } catch (error) {
      console.error("Signup Error:", error);
      setError("Something went wrong! Try again later.");
      // Handle signup error, e.g., display an error message
    }
  };

  return (
    <div className="container-main">
      <Header />
      <div className="login-page">
        <h2>Signup Page</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="formFields">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="formFields">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="formFields">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="formFields">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlephoneChange}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
