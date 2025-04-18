import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Import registerUser function

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Add state for email
  const [password, setPassword] = useState(""); // Add state for password
  const [username, setUsername] = useState(""); // Add state for username
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const token = await registerUser(username, email, password);
      localStorage.setItem("token", token);
      setToken(token);
      alert("User registered successfully! Redirecting to Pantry...");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update email state
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/login")}>
        Have an account? Login here.
      </button>
    </div>
  );
}

export default RegisterPage;
