import React from 'react';
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  // close menu when link clicked
  const closeMenu = () => {
    const checkbox = document.getElementById("menu-toggle");
    if (checkbox) checkbox.checked = false;
  };

  return (
    <nav className="navbar">
      <div className="logo">📋 To-Do </div>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <ul className="nav-links">
        <li className="sp"><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li className="sp"><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li className="sp"><Link to="/tips" onClick={closeMenu}>Tips</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
