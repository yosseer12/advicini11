import React from "react";
import './Tacos.css';
const tacosData = [
    {
      name: "Pimento's Ennasr",
      rating: "91%",
      reviews: "(500+)",
      category: "Tacos",
      price: "4,000 TND",
      deliveryTime: "30-50 min",
      discount: "-25%",
      offerType: "sélection",
      image: "/images/pimentos.jfif"

    },
    {
      name: "Casa Del Tacos",
      rating: "91%",
      reviews: "(197)",
      category: "Tacos",
      price: "1,500 TND",
      deliveryTime: "25-35 min",
      discount: "-15%",
      offerType: "tout le menu",
        image: "/images/casa.jfif"
    },
    {
      name: "Tacos Chaneb",
      rating: "88%",
      reviews: "(500+)",
      category: "Tacos",
      price: "2,500 TND",
      deliveryTime: "20-30 min",
      discount: "-20%",
      offerType: "sélection",
      image: "/images/chaneb.jfif"

    },
    {
      name: "Tacos band",
      rating: "91%",
      reviews: "(500+)",
      category: "Tacos",
      price: "2,500 TND",
      deliveryTime: "35-45 min",
      discount: null,
      offerType: null,
      image: "/images/fal.jfif"

    }
  ];
  const Tacos = () => {
    return (
      <div className="tacos-page">
        <div className="tacos-title">   Tacos </div>
        
        <div className="tacos-list">
          {tacosData.map((taco, index) => (
            <div className="taco-item" key={index}>
              {/* Conteneur de l'image avec le texte de superposition */}
              <div className="taco-image-container">
                <img src={taco.image} alt={taco.name} className="taco-image" />
                {taco.discount && (
                  <div className="taco-discount-overlay">{taco.discount}</div>
                )}
              </div>
              <h2 className="taco-name">{taco.name}</h2>
              <p className="taco-rating">
                {taco.rating} {taco.reviews}
              </p>
              <p className="taco-category">{taco.category}</p>
              <p className="taco-price">{taco.price}</p>
              <p className="taco-delivery">{taco.deliveryTime}</p>
            </div>
          ))}
          
        </div>
      </div>
    );
  };
  
  export default Tacos;
  


