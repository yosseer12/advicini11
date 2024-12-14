import React, { useState } from "react";

const LocalisationComponent = ({onLocationChange}) => {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            onLocationChange(location);  // Passer la localisation au parent
            setIsLoading(false);
          },
          (error) => {
            console.error("Erreur de géolocalisation :", error);
            alert("Impossible d'accéder à votre position.");
            setIsLoading(false);
          }
        );
      } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
      }
    };
  
  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#FFE08A" }}>
      <h1>Saisissez votre adresse pour voir ce qu'il y a dans le coin</h1>
      <div>
        <button onClick={handleUseMyLocation} style={{ margin: "10px", padding: "10px" }}>
          Utiliser ma position
        </button>
      </div>
      {isLoading ? (
        <p>Récupération de votre position...</p>
      ) : location ? (
        <p>
          Votre position : Latitude {location.latitude}, Longitude {location.longitude}
        </p>
      ) : (
        <p>Aucune position détectée.</p>
      )}
    </div>
    
  );
};

export default LocalisationComponent;
