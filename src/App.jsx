// import logo from './lonpm go.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuEditStartPage from './pages/MenuEditStartPage.jsx';
// import Home from "./pages/Home";
import MenuPage from './pages/MenuPage';
import KitchenDashboard from './pages/KitchenDashboard';
import BarDashboard from './pages/BarDashboard';
// import MenuStartPage from './components/MenuStartPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path= "/" element ={<Navbar/>}> */}
        {/* <Route [a] element={<Home/>} /> */}
        <Route path = '/' element ={<MenuEditStartPage/>} />
        <Route path= '/Menu/:category' element={<MenuPage/>} />
        <Route path= '/keuken' element={<KitchenDashboard/>} />
        <Route path= '/bar' element={<BarDashboard/>} />
        {/* </Route> */}
        </Routes>
    </Router>
    
  );
}


export default App;
