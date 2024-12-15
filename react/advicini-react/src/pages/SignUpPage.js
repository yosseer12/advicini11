import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import Login from './LoginPage';

const SignUp = () => {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    const userData = {
      name,
      firstName,
      email,
      address,
      password,
    };

    try {
      const response = await fetch('http://localhost:8000/api/SignUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Inscription réussie !');
        navigate('/BonPlan22', { state: { name, firstName } });
      } else {
        alert('Erreur lors de la création de l\'utilisateur. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Fetch error: ', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div className="container">
      <div className="SignUp__content">
        <img src="./login.png" alt="" className="SignUp__img" />
        <form onSubmit={handleSubmit} className="SignUp__form">
          <div>
            <h1 className="SignUp__title">Inscription</h1>
            <p className="signup__link">
              Vous avez déjà un compte ?{' '}
              <Link to="/login" className="signup__link-text">Connexion ici</Link>
            </p>
          </div>
          <div>
            <div className="SignUp__inputs">
              <div>
                <label htmlFor="input-name" className="SignUp__label">Nom</label>
                <input
                  type="text"
                  placeholder="Entrer votre nom"
                  required
                  className="SignUp__input"
                  id="input-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="input-firstname" className="SignUp__label">Prénom</label>
                <input
                  type="text"
                  placeholder="Entrer votre prénom"
                  required
                  className="SignUp__input"
                  id="input-firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="input-email" className="SignUp__label">Email</label>
                <input
                  type="email"
                  placeholder="Entrer votre email"
                  required
                  className="SignUp__input"
                  id="input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="input-address" className="SignUp__label">Adresse</label>
                <input
                  type="text"
                  placeholder="Entrer votre adresse"
                  required
                  className="SignUp__input"
                  id="input-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="input-password" className="SignUp__label">Mot de passe</label>
                <input
                  type="password"
                  placeholder="Entrer un mot de passe"
                  required
                  className="SignUp__input"
                  id="input-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="input-confirm-password" className="SignUp__label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  required
                  className="SignUp__input"
                  id="input-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="SignUp__buttons" >
              <button type="submit" className="SignUp__button">S'inscrire</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
