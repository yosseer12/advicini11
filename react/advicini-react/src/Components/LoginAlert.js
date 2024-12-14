import React, { useState } from 'react';
import './Alerte.css';
import { useNavigate } from 'react-router-dom';  // Utilise useNavigate à la place de useHistory

function LoginAlert({ onClose }) {
  const navigate = useNavigate(); // Crée une instance de navigate

  // Fonction de redirection vers la page d'inscription
  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  // Fonction de redirection vers la page de connexion
  const handleLoginPageRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="alert">
      <div className="alert-message-container">
        <button className="alert-close" onClick={onClose}>X</button>
        <i className="fas fa-exclamation-triangle alert-icon"></i>
        <span className="alert-message">Vous devez être connecté pour effectuer cette action.</span>
      </div>
      <div className="alert-action">
        <button className="toggle-button" onClick={handleSignupRedirect}>
          Aller à la page d'inscription
        </button>
        <button className="toggle-button" onClick={handleLoginPageRedirect}>
          Aller à la page de connexion
        </button>
      </div>
    </div>
  );
}

export default LoginAlert;
