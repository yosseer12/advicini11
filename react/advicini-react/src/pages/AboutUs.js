import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <header className="about-us-header">
        <h1>À Propos de Nous</h1>
        <p>Votre partenaire de confiance pour découvrir les meilleurs bons plans locaux.</p>
      </header>
      <div className="about-us-content">
        <section className="about-section">
          <div className="about-image animate">
            <img src="https://via.placeholder.com/400x300" alt="Notre Mission" />
          </div>
          <div className="about-text">
            <h2>Notre Mission</h2>
            <p>
              Chez <strong>Advicini</strong>, nous avons pour mission de connecter les utilisateurs à leur communauté locale. 
              Nous aidons à découvrir des expériences uniques et des offres incroyables.
            </p>
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-text">
            <h2>Qui Sommes-Nous</h2>
            <p>
              Une équipe passionnée de technologie qui croit en l'impact des connexions locales. Nous mettons la technologie 
              au service des communautés.
            </p>
          </div>
          <div className="about-image animate">
            <img src="https://via.placeholder.com/400x300" alt="Qui Sommes-Nous" />
          </div>
        </section>

        <section className="about-section">
          <div className="about-image animate">
            <img src="https://via.placeholder.com/400x300" alt="Notre Vision" />
          </div>
          <div className="about-text">
            <h2>Notre Vision</h2>
            <p>
              Favoriser un monde où les petites entreprises locales prospèrent et où chacun trouve des expériences adaptées 
              à ses besoins.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
