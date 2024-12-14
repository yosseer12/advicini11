import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './welcom.css';

const Welcome = () => {
    const location = useLocation();
    const { name, firstName } = location.state || {};

    return (
        <div className="welcome-container">
            <div className="welcome-box">
                <h1>Bienvenue, {firstName} {name}!</h1>
                <p>----------------------------------</p>
                <Link to="/accueil">
                    <button className="welcome-button">Accéder à l'accueil</button>
                </Link>
            </div>
        </div>
    );
};

export default Welcome;
