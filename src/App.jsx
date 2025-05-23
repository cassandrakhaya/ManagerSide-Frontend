// src/App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SubToolbar from './components/SubToolbar';
import MenuEditStartPage from './pages/MenuEditStartPage.jsx';
import MenuPage from './pages/MenuPage';
import KitchenDashboard from './pages/KitchenDashboard';
import BarDashboard from './pages/BarDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MenuEditStartPage />} />
        <Route path='/Menu/:category' element={<MenuPage />} />
        <Route path='/keuken' element={<KitchenDashboard />} />
        <Route path='/bar' element={<BarDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
