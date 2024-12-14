import React, { useEffect, useState } from 'react';
import BonPlanList from '../Components/BonPlanList';

function HomePage({ isAuthenticated }) {
  const [bonsPlans, setBonsPlans] = useState([]);

  useEffect(() => {
    // Simuler la récupération des bons plans depuis l'API backend
    fetch('http://localhost:8080/api/bonplans')
      .then(response => response.json())
      .then(data => setBonsPlans(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Bienvenue sur nos bons plans</h1>
      <BonPlanList bonsPlans={bonsPlans} isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default HomePage;
