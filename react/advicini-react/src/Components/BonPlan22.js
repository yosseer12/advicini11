import React, { useState, useEffect } from "react";
import './BonPlan.css';
import '../pages/Login.css';  // Dans le fichier BonPlan.js

import LoginAlert from "./LoginAlert";

const BonPlanComponents = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [likes, setLikes] = useState(7);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [location, setLocation] = useState(null);  // Initialize location as null
  const [bonsPlans, setBonsPlans] = useState([]); // To hold Bon Plans from the API
  const [locationPermission, setLocationPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [newBonPlan, setNewBonPlan] = useState({
    title: "",
    description: "",
    imageUrl: "",
    location: "",
    phone: "",
    website: "",
    openingHours: ""
  });

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowAlert(true); // Show alert if not logged in
    } else {
      setLikes(likes + 1);
    }
  };

  const handleComment = () => {
    if (!isLoggedIn) {
      setShowAlert(true); // Show alert if not logged in
    } else if (comment) {
      setComments([...comments, comment]);
      setComment(""); // Reset comment field
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position capturée :", position.coords); // Affiche les coordonnées
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
          alert("Impossible d'accéder à votre position.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  const handleAddBonPlan = (e) => {
    e.preventDefault();
    // Add the new "Bon Plan" to the list
    setBonsPlans([newBonPlan, ...bonsPlans]);
    setNewBonPlan({
      title: "",
      description: "",
      imageUrl: "",
      location: "",
      phone: "",
      website: "",
      openingHours: ""
    });  // Reset form fields after submission
  };

  useEffect(() => {
    // Check for geolocation permission
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        setLocationPermission(permissionStatus.state);
      });
    }
  }, []); // S'exécute une seule fois au chargement du composant

  useEffect(() => {
    // Fetch bons plans based on location
    if (location) {
      console.log("Nouvelle localisation détectée :", location);
      fetch(`http://localhost:8000/api/bonsplans?lat=${location.latitude}&lon=${location.longitude}`)
        .then(response => {
          if (!response.ok) {
            throw new Error("Erreur lors de l'appel API");
          }
          return response.json();
        })
        .then(data => {
          console.log("Bons plans récupérés :", data);
          setBonsPlans(data);
        })
        .catch(error => console.error("Erreur lors du chargement des bons plans :", error));
    } else {
      // Charger plusieurs bons plans par défaut si la localisation n'est pas disponible
      setBonsPlans([ /* Default Bons Plans */ ]);
    }
  }, [location]); // Runs when location is updated

  return (
    <div>
      {showAlert && <LoginAlert onClose={closeAlert} />}

      <div className="container">
        <div className="content">
          <h1>Les bons plans livrés jusqu'à chez vous</h1>
          <p>Restaurants, Cafés, etc.</p>
          <div className="input-container">
            <input type="text" placeholder="Quelle est votre adresse ?" />
            <button onClick={handleUseMyLocation}>Utiliser ma position</button>
            {locationPermission === "denied" && <p>Vous avez refusé la géolocalisation.</p>}
          </div>
        </div>
        <img src="/images/logo.webp" alt="Groceries" style={{ width: "150px", height: "auto" }} />
      </div>

      {/* Add New Bon Plan Section */}
      <div className="add-bon-plan">
        <h2>Ajouter un bon plan</h2>
        <form onSubmit={handleAddBonPlan}>
          <input 
            type="text" 
            placeholder="Titre" 
            value={newBonPlan.title} 
            onChange={(e) => setNewBonPlan({ ...newBonPlan, title: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={newBonPlan.description} 
            onChange={(e) => setNewBonPlan({ ...newBonPlan, description: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="URL de l'image" 
            value={newBonPlan.imageUrl} 
            onChange={(e) => setNewBonPlan({ ...newBonPlan, imageUrl: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Localisation" 
            value={newBonPlan.location} 
            onChange={(e) => setNewBonPlan({ ...newBonPlan, location: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Téléphone" 
            value={newBonPlan.phone} 
            onChange={(e) => setNewBonPlan({ ...newBonPlan, phone: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Site Web" 
            value={newBonPlan.website} 
            onChange={(e) => setNewBonPlan({ ...newBonPlan, website: e.target.value })} 
          />
          <input 
            type="text" 
            placeholder="Heures d'ouverture" 
            value={newBonPlan.openingHours} 
            onChange={(e) => setNewBonPlan({ ...newBonPlan, openingHours: e.target.value })} 
          />
          <button type="submit">Ajouter le bon plan</button>
        </form>
      </div>

      {isLoading ? (
        <p>Chargement des bons plans...</p>
      ) : bonsPlans.length > 0 ? (
        bonsPlans.map((bonPlan) => (
          <div key={bonPlan.id} className="bon-plan">
            <h3>{bonPlan.title}</h3>
            <p>{bonPlan.description}</p>
            <img src={bonPlan.imageUrl} alt="Bon Plan" style={{ width: "100px", height: "100px" }} />
            <div className="buttons-container">
              <button onClick={handleLike}>
                <i className="fas fa-heart"></i> {likes} J'aime
              </button>
              <button onClick={handleComment}>
                <i className="fas fa-comment-alt"></i> Commenter
              </button>
              <div className="stars-rating">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fas fa-star"></i> // Full stars
                ))}
              </div>
            </div>
            <div>
              {comments.map((com, index) => (
                <p key={index}>{com}</p>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div>
          <h1>Aucun bon plan trouvé dans votre région</h1>
        </div>
      )}
    </div>
  );
};

export default BonPlanComponents;
