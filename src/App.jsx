import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MenuEditStartPage from './pages/MenuEditStartPage.jsx';
import MenuPage from './pages/MenuPage';

const App = () => {
  // ✅ Stap 1: Voeg de toggle state toe
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);

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
        <button
          className="btn-light"
          onClick={() => setShowCategoryEditor(true)}
        >
          Categorien Bijwerken
        </button>
      </div>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <MenuEditStartPage
              showCategoryEditor={showCategoryEditor}
              setShowCategoryEditor={setShowCategoryEditor}
            />
          }
        />
        <Route path="/Menu/:category" element={<MenuPage />} />
      </Routes>
    </Router>
  );
};

export default App;
