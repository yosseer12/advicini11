import React, { useState } from 'react';
import './AddDealPopup.css';

function AddDealPopup({ onClose }) {
  const [position, setPosition] = useState([51.505, -0.09]); // Coordonnées par défaut
  const [deal, setDeal] = useState({ title: '', description: '', phone: '', images: [] }); // Ajout d'un champ pour le téléphone
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // État pour gérer le popup de succès

  // Fonction pour gérer l'ajout d'images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setDeal((prevDeal) => ({
      ...prevDeal,
      images: [...prevDeal.images, ...files],
    }));
  };

  const handleSubmit = () => {
    // Vérification que les champs obligatoires sont remplis
    if (!deal.title.trim() || !deal.description.trim() || !deal.phone.trim()) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    // Soumission simulée
    console.log('Bon Plan ajouté:', { ...deal, location: position });

    // Affiche le popup de succès
    setShowSuccessPopup(true);

    // Réinitialise le formulaire après soumission
    setDeal({ title: '', description: '', phone: '', images: [] });

    // Masque le popup après 2 secondes
    setTimeout(() => {
      setShowSuccessPopup(false);
      onClose(); // Ferme le popup principal après la soumission
    }, 2000);
  };

  // Fonction pour mettre à jour la localisation (ici juste un exemple)
  const handleLocationChange = (e) => {
    const value = e.target.value.split(','); // En supposant une entrée sous forme de latitude,longitude
    if (value.length === 2) {
      setPosition([parseFloat(value[0]), parseFloat(value[1])]);
    }
  };

  return (
    <>
      {/* Overlay et contenu du popup principal */}
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Ajouter un Bon Plan</h2>

          {/* Champ Titre */}
          <input
            type="text"
            placeholder="Titre"
            value={deal.title}
            onChange={(e) => setDeal({ ...deal, title: e.target.value })}
          />

          {/* Champ Description */}
          <textarea
            placeholder="Description"
            value={deal.description}
            onChange={(e) => setDeal({ ...deal, description: e.target.value })}
          />

          {/* Champ pour le numéro de téléphone */}
          <input
            type="text"
            placeholder="Numéro de téléphone"
            value={deal.phone}
            onChange={(e) => setDeal({ ...deal, phone: e.target.value })}
          />

          {/* Champ pour la localisation */}
          <input
            type="text"
            placeholder="Localisation (Latitude, Longitude)"
            onChange={handleLocationChange}
          />

          {/* Champ pour l'ajout d'images */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Affichage des images téléchargées */}
          <div className="image-preview">
            {deal.images.length > 0 && (
              <ul>
                {deal.images.map((image, index) => (
                  <li key={index}>
                    <img src={URL.createObjectURL(image)} alt={`image-${index}`} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Boutons d'actions */}
          <div className="popup-actions">
            <button className="btn-submit" onClick={handleSubmit}>Ajouter</button>
            <button className="btn-cancel" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>

      {/* Popup de succès */}
      {showSuccessPopup && (
        <div className="success-popup">
          <p>Bon Plan ajouté avec succès !</p>
        </div>
      )}
    </>
  );
}

export default AddDealPopup;
