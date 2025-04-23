import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MenuEditStartPage from './pages/MenuEditStartPage.jsx';
import MenuPage from './pages/MenuPage';

const App = () => {
  return (
    <Router>
      {/* Hoofd Navbar */}
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

      {/* Sub-toolbar */}
      <div className="sub-toolbar">
        <button className="btn-light">All Categories</button>
        <button className="btn-light">Edit Categories</button>
        <button className="btn-new-product">New Product <span>+</span></button>
      </div>

      {/* Routes */}
      <Routes>
        <Route path='/' element={<MenuEditStartPage />} />
        <Route path='/Menu/:category' element={<MenuPage />} />
      </Routes>
    </Router>
  );
};

export default App;
