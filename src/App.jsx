// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from './components/Navbar';
import SubToolbar from './components/SubToolbar';
import MenuEditStartPage from './pages/MenuEditStartPage.jsx';
import MenuPage from './pages/MenuPage';
import KitchenDashboard from './pages/KitchenDashboard';
import BarDashboard from './pages/BarDashboard';
import BedieningDashboard from "./pages/BedieningDashboard.jsx";

// ✅ Toastify imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showCategoryEditor, setShowCategoryEditor] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/"
          element={
            <MenuEditStartPage showCategoryEditor={showCategoryEditor} setShowCategoryEditor={setShowCategoryEditor} />
          }
        />
        <Route path="/Menu/:category" element={<MenuPage />} />
        <Route path='/keuken' element={<KitchenDashboard />} />
        <Route path='/bar' element={<BarDashboard />} />
          <Route path='/bediening' element={<BedieningDashboard />} />
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
