import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
console.log("Navbar component loaded");

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/home" className="navbar-logo">Advicini</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/AboutUs">About</Link></li>
          <li><Link to="/Contact">Contact</Link></li>
          <li><Link to="/login">Connexion</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
