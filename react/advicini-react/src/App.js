import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BonPlan from './Components/BonPlan';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import BonPlan22 from './Components/BonPlan22';
import './pages/Tacos.css';
import Tacos from './pages/Tacos';

function App()
 {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);
 
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BonPlan />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/pages/Tacos" element={<Tacos/>} />
        <Route path="/BonPlan22" element={<BonPlan22 />} />


   
      </Routes>
    </Router>
  );
}

export default App;
