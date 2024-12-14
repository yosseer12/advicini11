import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

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
        navigate('/welcome', { state: { name, firstName } }); 
      } else {
        console.error('Error creating user');
      }
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  };

  return (
    <div className="container">
      <div className="SignUp__content">
        <img src="./login.png" alt="" className="SignUp__img" />
        <form onSubmit={handleSubmit} className="SignUp__form">
          <div>
            <h1 className="SignUp__title">
              <span> </span>
            </h1>
            <p className="signup__link">
              Vous avez déjà un compte?
              <Link to="/login" className="signup__link-text"> Connexion ici</Link>
            </p>
          </div>
          <div>
            <div className="SignUp__inputs">
              <div>
                <label htmlFor="input-name" className="SignUp__label">Nom</label>
                <input
                  type="text"
                  placeholder="Entrer votre Nom"
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
                  placeholder="Entrer votre Prénom"
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
                  placeholder="Entrer votre Email"
                  required
                  className="SignUp__input"
                  id="input-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="input-address" className="SignUp__label">Adresse à domicile</label>
                <input
                  type="text"
                  placeholder="Entrer votre Adresse à domicile"
                  required
                  className="SignUp__input"
                  id="input-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="input-password" className="SignUp__label">Mot De Passe</label>
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
  <label htmlFor="input-confirm-password" className="SignUp__label">Confirmer le Mot De Passe</label>
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
            <div className="SignUp__buttons">
              
            <button
    type="submit" // This prevents the form from being submitted
    onClick={() => navigate('/welcomeAdmin')}
    className="SignUp__button"
  >SignUp</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
