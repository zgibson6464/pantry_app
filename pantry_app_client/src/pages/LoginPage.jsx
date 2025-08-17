// description: This file contains the the LoginPage component, which allows users to login to their account and handles the login process by calling the loginUser function from the API module.
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Import loginUser function to be used in handleLogin

function LoginPage({ setToken }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState(""); // Add state for password

  // Function to handle login, imported from api.js
  // This function will be called when the user submits the login form
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password); // Call loginUser API
      if (!token) {
        throw new Error("Invalid login"); // Handle invalid login
      }
      localStorage.setItem("token", token);
      setToken(token); // Store token in localStorage
      alert("Login successful!");
      setEmail(""); // Clear email input
      setPassword(""); // Clear password input
      navigate("/"); // Redirect to the home page or another route
    } catch (error) {
      alert("Login failed. Please check your email and password");
      console.error("Login error:", error); // Log the error for debugging;
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/register")}>
        Dont have an account? Register here.
      </button>
    </div>
  );
}

export default LoginPage;
