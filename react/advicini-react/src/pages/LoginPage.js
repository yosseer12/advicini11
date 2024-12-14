import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import '../Components/BonPlan22'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email, password };

        try {
            const response = await fetch('http://localhost:8000/api/login_check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const userData = await response.json();
                const roles = userData.user.roles;
                if (roles.includes('ROLE_ADMIN')) {
                    // Navigate to the homepage after login
                    navigate('/pages/welcome', { state: { name: userData.user.name, firstName: userData.user.firstName } });
                } else {
                    // Navigate to the homepage after login
                    navigate('/', { state: { name: userData.user.name, firstName: userData.user.firstName } });
                }
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Fetch error: ', error);
        }
    };

    return (
        <div className="container">
            <div className="login__content">
                <img src="./login.png" alt="" className="login__img" />
                <form onSubmit={handleSubmit} className="login__form">
                    <div>
                        <h1 className="login__title">
                            <span></span>
                        </h1>
                        <p className="login__link">
                            Vous n'avez pas de compte?
                            <Link to="/SignUp" className="login__link-text"> Inscrivez-vous ici</Link>
                        </p>
                    </div>
                    <div>
                        <div className="login__inputs">
                            <div>
                                <label htmlFor="input-email" className="login__label">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    required
                                    className="login__input"
                                    id="input-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="input-pass" className="login__label">Mot de passe</label>
                                <div className="login__box">
                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        required
                                        className="login__input"
                                        id="input-pass"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <i className="ri-eye-off-line login__eye" id="input-icon"></i>
                                </div>
                            </div>
                        </div>
                        <div className="login__check">
                            <input
                                type="checkbox"
                                className="login__check-input"
                                id="input-check"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label htmlFor="input-check" className="login__check-label">Remember me</label>
                        </div>
                    </div>
                    <div>
                        <div className="login__buttons">
                            <button onClick={() => navigate('/BonPlan22')} type="submit" className="login__button">Log In</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default Login;
