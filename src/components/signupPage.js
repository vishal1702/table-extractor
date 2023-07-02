import React, { useState } from "react";
import Header from "./header";
import axios from "axios";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value || "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        username,
        password,
      });
      console.log("Signup successful:", response.data);
      // Handle successful signup, e.g., redirect to another page
    } catch (error) {
      console.error("Signup Error:", error);
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
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default SignupPage;
