// description: This file contains the NavBar component, which is the navigation bar for the application. It contains the logout button that calls the handleLogout function from the API module when clicked.
import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap"; // Import Nav from react-bootstrap
import "../navbarstyle.css"; // Import your CSS file
import { handleLogout } from "../api"; // Import handleLogout function

// handles the class and style of the navbar
export default function Navbar({ setToken }) {
  return (
    <Nav className="navbar">
      <h1 className="nav-h1">Your Digital Pantry</h1>
      <div className="menu-items">
        <Link
          to="/login"
          className="menu-item"
          onClick={() => handleLogout({ setToken })} // utillizes the handleLogout function from api.js
        >
          <p>Logout</p>
        </Link>
        <Link to="/" className="menu-item">
          <p>Home</p>
        </Link>
        <Link to="/Cart" className="menu-item">
          <p>Cart</p>
        </Link>
      </div>
    </Nav>
  );
}
