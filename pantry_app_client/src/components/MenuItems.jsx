import React from "react";
import { Nav } from "react-bootstrap"; // Import Nav from react-bootstrap
import "../styles.css"; // Import your CSS file

export const MenuItems = () => {
  return (
    <>
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/logount">Logout</Nav.Link>
      </Nav.Item>
    </>
  );
};
