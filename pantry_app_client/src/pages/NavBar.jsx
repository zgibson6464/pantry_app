// description: This file contains the NavBar component, which is the navigation bar for the application. It contains the logout button that calls the handleLogout function from the API module when clicked.
import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap"; // Import Nav from react-bootstrap
import "../styles.css"; // Import your CSS file
import { handleLogout } from "../api"; // Import handleLogout function

// handles the class and style of the navbar
export default function Navbar({ setToken }) {
  return (
    <Nav className="navbar navbar-dark bg-dark">
      <h1 className="nav-h1">Your Digital Pantry</h1>
      <div className="nav-logo">
        <Link
          to="/login"
          className="nav-link"
          onClick={() => handleLogout({ setToken })} // utillizes the handleLogout function from api.js
        >
          <p className="nav-logout">Logout</p>
        </Link>
      </div>
    </Nav>
  );
}
