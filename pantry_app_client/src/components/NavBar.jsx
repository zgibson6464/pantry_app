import React from "react";
import { MenuItems } from "./MenuItems";
import { Nav } from "react-bootstrap"; // Import Nav from react-bootstrap
import "../styles.css"; // Import your CSS file

export default function Navbar() {
  return (
    <Nav className="navbar navbar-dark bg-dark">
      <h1 className="nav-h1">Your Digital Pantry</h1>
      <div className="nav-logo">
        <MenuItems />
      </div>
    </Nav>
  );
}
