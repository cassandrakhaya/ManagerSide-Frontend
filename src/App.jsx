// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SubToolbar from './components/SubToolbar';
import MenuEditStartPage from './pages/MenuEditStartPage.jsx';
import MenuPage from './pages/MenuPage';
import KitchenDashboard from './pages/KitchenDashboard';
import BarDashboard from './pages/BarDashboard';

// ✅ Toastify imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);

  return (
    <Router>
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

      <div className="sub-toolbar">
        <button
          className="btn-light"
          onClick={() => setShowCategoryEditor(true)}
        >
          Categorieën Bijwerken
        </button>
      </div>

      <Routes>
        <Route path="/"
          element={
            <MenuEditStartPage showCategoryEditor={showCategoryEditor} setShowCategoryEditor={setShowCategoryEditor} />
          }
        />
        <Route path="/Menu/:category" element={<MenuPage />} />
        <Route path='/keuken' element={<KitchenDashboard />} />
        <Route path='/bar' element={<BarDashboard />} />
      </Routes>

      {/* ✅ ToastContainer toevoegen */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </Router>
  );
};

export default App;
