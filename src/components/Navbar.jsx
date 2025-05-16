// src/components/Navbar.jsx
import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">RestaurantApp</div>
      <div className="navbar-links">
        <Link to="#">Actieve Bestellingen</Link>
        <Link to="#">Bestellingen</Link>
        <Link to="#" className="active-link">Producten</Link>
      </div>
      <div className="navbar-auth">
        <Link to="#" className="btn-outline">Inloggen</Link>
        <Link to="#" className="btn-filled">Registreren</Link>
      </div>
    </div>
  );
};

export default Navbar;
