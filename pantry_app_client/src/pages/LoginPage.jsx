import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api"; // Import loginUser function

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState(""); // Add state for password

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(email, password); // Call loginUser API
      localStorage.setItem("token", token); // Store token in localStorage
      alert("Login successful!");
      setEmail(""); // Clear email input
      setPassword(""); // Clear password input
      navigate("/"); // Redirect to the home page or another route
    } catch (error) {
      alert("Login failed");
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
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}
