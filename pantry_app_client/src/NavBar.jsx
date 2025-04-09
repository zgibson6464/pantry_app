import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect to the home page
  };
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav>
      <h1>Pantry App</h1>
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default NavBar;
