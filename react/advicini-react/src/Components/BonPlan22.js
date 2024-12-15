import React, { useState, useEffect } from "react";
import './BonPlan22.css';
import { Link } from 'react-router-dom';
import SignUp from "../pages/SignUpPage";
import StarRating from './StarRating'; // Adjust the path if necessary
import Tacos from "../pages/Tacos";
import AddDealPopup from "./AddDealPopup"



const BonPlan22 = () => {
  const [bonsPlans, setBonsPlans] = useState([]);
  const [filteredBonsPlans, setFilteredBonsPlans] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Declare the current image index
  const [comments, setComments] = useState([]); // To store all comments
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAddDealPopup, setShowAddDealPopup] = useState(false); // État pour contrôler le popup
  const [showAddCommentPopup, setShowAddCommentPopup] = useState(false); // État pour contrôler le popup

  const [deals, setDeals] = useState([]); // Pour stocker la liste des bons plans
  const [likedDeals, setLikedDeals] = useState([]); // Pour stocker les bons plans likés
  const [successMessage, setSuccessMessage] = useState(""); // État pour le message de succès

  const [showCommentPopup, setShowCommentPopup] = useState(false); // Pour afficher ou masquer le popup de commentaire
  const [currentDealId, setCurrentDealId] = useState(null); // L'ID du bon plan actuellement sélectionné pour commenter
  const [comment, setComment] = useState(""); // Pour gérer le commentaire
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Pour afficher le message de succès


  useEffect(() => {
    const fetchBonsPlans = () => {
      setBonsPlans([
        { 
          id: 1, 
          title: "Pavarotti Pasta", 
          description: "Excellent services des plats généreux et délicieux un endroit très agréable et convivial à recommander vivement et merci à tous le personnel", 
          location: "1 Rue Sadok Mokadem Les Berges Du Lac, Tunis 1059 Tunisie", 
          Tel: "+216 58 799 209",
           category: "restaurant",
          images: ["/images/pavarottiinterieur.jpg", "/images/pava4.jpg", "/images/pava5.jpg", "/images/pavarrotiislata.jpg", "/images/pava4.jpg", "/images/pava3.jpg"],
          userProfile: {
            name: "Yousser bouguerra",
            profileImage: "/images/yosrprofile.jpg", // Image du profil
          }
        },
        { 
          id: 2, 
          title: "Restaurant Lemdina ", 
          description: "La cuisine méditerranéenne et tunisienne de ce restaurant offre des repas authentiques. N'oubliez pas de déguster des salades délicieuses à Lemdina ", 
          location: "1 Les Berges du Lac A coté de l'hôtel Acropole, Tunis 1059 Tunisie", 
          Tel: "+216 55 113 333 ",
           category: "restaurant",
          images: ["/images/lemdina.jpg", "/images/lemdina2.jpg","/images/lemdinamakrouna.jpg","/images/lemdinasoupe.jpg","/images/lemdinariz.jpg"],
          userProfile: {
            name: "Restaurant lemdina",
            profileImage: "/images/lemdina.jpg", // Image du profil
          }
        },
        { 
          id: 3, 
          title: "Bigabo", 
          description: "Service rapide, personnelle super gentil, des plats très copieux qu’on a pas pu finir et très très bon !! Je recommande !! On a tous adoré !", 
          location: "Avenue Du Cheikh Zayed Les Berges Du Lac, Tunis 1059 Tunisie", 
          Tel: "+216 28 857 630",
           category: "restaurant",
          images: ["/images/bigabo.jpg", "/images/bigabointerieur.jpg", "/images/bigabo2.jpg","/images/bigabo.jpg","/images/bigabointerieur.jpg"],
          userProfile: {
            name: "Jane Smith",
            profileImage: "/images/john.jfif", // Image du profil
          }
        },
        { 
          id: 4, 
          title: "Di Napoli", 
          description: "Excellent services des plats généreux et délicieux un endroit très agréable et convivial à recommander vivement et merci à tous le personnel", 
          location: 	"unnamed road, 2088 Gouvernorat Ariana, Tunisie", 
          latitude: 36.8563, // Latitude pour Pavarotti Pasta
          longitude: 10.1879,
          Tel: "+216 58 799 209",
           category: "café-restaurant",
          images: ["/images/dinapoli1.jpg", "/images/dinapoli2.jpg", "/images/dinapoli3.jpg","/images/dinapoli1.jpg","/images/dinapoli2.jpg","/images/dinapoli1.jpg"],
          userProfile: {
            name: "Jane Smith",
            profileImage: "/images/john.jfif", // Image du profil
          }
        },
        { 
          id: 5, 
          title: "The 716 ", 
          description: "Bienvenue chez nous", 
          location: "1 Les Berges du Lac A coté de l'hôtel Acropole, Tunis 1059 Tunisie", 
          Tel: "+216 55 113 333 ",
           category: "café-restaurant",
          images: ["/images/716.jpg", "/images/7162.jpg","/images/7163.jpg","/images/7164.jpg","/images/7165.jpg","/images/7166.jpg"],
          userProfile: {
            name: "Jane Smith",
            profileImage: "/images/john.jfif", // Image du profil
          }
        },
        { 
          id: 6, 
          title: "Cosmitto Cafe", 
          description: "unique decor, nice music and tasty coffee and cake! The place is not too big but it is confortable Notice : They have many choices of coffee ☕", 
          location: "tunis , centre ville", 
          Tel: "+216 55 113 333 ",
           category: "café",
          images: ["/images/cosmitto.jpg", "/images/cos2.jpg","/images/cos3.jpg","/images/cosmitto.jpg","/images/cos3.jpg","/images/cos2.jpg"],
          userProfile: {
            name: "Jane Smith",
            profileImage: "/images/jane_profile.jpg", // Image du profil
          }
        }
      ]);
    };
  
    fetchBonsPlans();
  }, []);

    // Fonction pour gérer le like
    const handleLike = (dealId) => {
      if (likedDeals.includes(dealId)) {
        setLikedDeals(likedDeals.filter(id => id !== dealId)); // Si déjà liké, on annule le like
      } else {
        setLikedDeals([...likedDeals, dealId]); // Sinon, on ajoute le like
      }
    };
 // Gérer l'affichage du popup
 const handleAddDealClick = () => {
  setShowAddDealPopup(true); // Afficher le popup
};

  const handleClosePopup = () => {
    setShowAddDealPopup(false); // Fermer le popup
  };

  

  // Fonction pour afficher le popup de commentaire
  const handleCommentClick = (dealId) => {
    setCurrentDealId(dealId); // Sauvegarder l'ID du bon plan à commenter
    setShowCommentPopup(true); // Afficher le popup
  };

  // Fonction pour fermer le popup
  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setComment(""); // Réinitialiser le champ de commentaire
  };

  // Fonction pour gérer la soumission du commentaire
  const handleSubmitComment = () => {
    console.log(`Commentaire pour le deal ${currentDealId}: ${comment}`);
    setComment(""); // Réinitialiser le champ de commentaire
    closeCommentPopup(); // Fermer le popup après soumission

    // Afficher le message de succès
    setShowSuccessMessage(true);

    // Masquer le message de succès après 3 secondes
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
// Fonction pour calculer la distance entre deux points (en kilomètres) en utilisant la formule de Haversine
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en kilomètres
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance en kilomètres
  return distance;
};
useEffect(() => {
  if (userLocation) {
    const filteredPlans = bonsPlans.filter((plan) => {
      // Filtrer les bons plans dont l'emplacement contient "Ariana"
      const planLocation = plan.location.toLowerCase();
      const userLocationCity = "Ariana".toLowerCase(); // Vous pouvez obtenir la ville de l'utilisateur si disponible

      return planLocation.includes(userLocationCity); // Compare si la localisation du plan contient la ville de l'utilisateur
    });
    

    setFilteredBonsPlans(filteredPlans);
  }
}, [userLocation, bonsPlans]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bonsPlans[0]?.images.length);
    }, 3000); // Change the image every 3 seconds

    return () => clearInterval(interval); // Cleanup the setInterval
  }, [bonsPlans]);

  useEffect(() => {
    setFilteredBonsPlans(
      bonsPlans.filter((plan) =>
        plan.location.toLowerCase().includes(searchLocation.toLowerCase())
      )
    );
  }, [searchLocation, bonsPlans]);
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? bonsPlans[0]?.images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bonsPlans[0]?.images.length);
  };
  
  const handleGeolocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          alert(`Votre position : Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}`);
        },
        (error) => alert("Impossible de récupérer la localisation"),
        { enableHighAccuracy: true }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };
  useEffect(() => {
    setFilteredBonsPlans(
      bonsPlans.filter((plan) =>
        (selectedCategory === "" || plan.category === selectedCategory) &&
        plan.location.toLowerCase().includes(searchLocation.toLowerCase())
      )
    );
  }, [selectedCategory, searchLocation, bonsPlans]);
  



const handleCategoryClick = (category) => {
  setSelectedCategory(category); // Mettre à jour la catégorie sélectionnée
};
  return (
    <div className="bons-plans-container">
      <h2>Les Bons Plans chez Nous</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par lieu..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <div className="geolocate-button">
          <button onClick={handleGeolocate}>Localiser mon emplacement</button>
        </div>
      

      </div>
      
       {/* Button to show popup */}
       <div className="offer-banner">
        <button onClick={handleAddDealClick} className="order-button">
          Poster
        </button>
        <div className="offer">
          <p className="offer-text">-30% sur vos premiers postes !</p>
        </div>
      </div>

 {/* Category Bar */}
 <div className="category-bar">
        <div
          className="category-circle"
          onClick={() => handleCategoryClick("café")}
        >
          <img src="/images/cafe.jfif" alt="Café" />
          <p>Café</p>
        </div>
        <div
          className="category-circle"
          onClick={() => handleCategoryClick("restaurant")}
        >
          <img src="/images/resto14.jfif" alt="Restaurant" />
          <p>Restaurant</p>
        </div>
        <div
          className="category-circle"
          onClick={() => handleCategoryClick("café-restaurant")}
        >
          <img src="/images/resto.jfif" alt="Café-Resto" />
          <p>Café-Resto</p>
        </div>
      </div>

     {/* Popup for adding a deal */}
     {showAddDealPopup && <AddDealPopup onClose={handleClosePopup} />}

      {/* Displaying filtered Bons Plans */}
      {filteredBonsPlans.length === 0 ? (
        <p>Aucun bon plan trouvé pour cette localisation.</p>
      ) : (
        filteredBonsPlans.map((bonPlan) => (
          <div key={bonPlan.id} className="bon-plan">
            
                    <div className="user-profile">
                  {/* Check if userProfile exists */}
                    {bonPlan.userProfile && bonPlan.userProfile.profileImage ? (
                      <img src={bonPlan.userProfile.profileImage} alt="User Profile" className="user-profile-img" />
                    ) : (
                    <img src="/images/default_profile.jpg" alt="Default Profile" className="user-profile-img" />
                       )}
                   <p className="user-name">{bonPlan.userProfile?.name || "Anonyme"}</p>
                    </div>

            <h3>{bonPlan.title}</h3>
            <p>{bonPlan.description}</p>
            <p><strong>Lieu :</strong> {bonPlan.location}</p>
            <p><strong>Tel:</strong> {bonPlan.Tel}</p>

           
    
            {/* Image Carousel */}
            {bonPlan.images && bonPlan.images.length > 0 && (
              <div className="bon-plan-carousel">
                <img
                  src={bonPlan.images[currentImageIndex]} 
                  alt={`Image ${currentImageIndex + 1}`}
                  className="bon-plan-img"
                />
              </div>
            )}

          
            {/* Comment Form */}
            <div className="comment-form">
              
            <button className="like-button" onClick={() => handleLike(bonPlan.id)}>
  👍 J'aime
</button>


<button type="submit" className="submit-button" onClick={() => handleCommentClick(deals.id)}>
  Commenter
</button>
  {/* Popup de commentaire */}
  {showCommentPopup && (
          <div className="comment-popup">
            <div className="popup-content">
              <h3>Ajouter un commentaire</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Laissez un commentaire"
              ></textarea>
              <div className="popup-actions">
                <button onClick={handleSubmitComment}>Envoyer</button>
                <button onClick={closeCommentPopup}>Fermer</button>
              </div>
            </div>
          </div>
        )}
            
      
              
            </div>
             {/* Popup de succès */}
        {showSuccessMessage && (
          <div className="success-popup">
            <p>Commentaire ajouté avec succès !</p>
          </div>
        )}
          </div>
        ))
      )}

      
      <div class="categories-section">
  <h2 class="categories-title">Meilleures Catégories à Tunis</h2>
  <ul class="categories-list">
    <li><a href="/pages/Tacos">Tacos</a></li>
    <li><a href="/bonsplans/sandwichs">Sandwichs</a></li>
    <li><a href="/bonsplans/pizza">Pizza</a></li>
    <li><a href="/bonsplans/salades">Salades</a></li>
    <li><a href="/bonsplans/poulet">Poulet</a></li>
    <li><a href="/bonsplans/pates">Pâtes</a></li>
    <li><a href="/bonsplans/crepes">Crêpes</a></li>
  </ul>
</div>

    </div>
    
    
  );
};

export default BonPlan22;
