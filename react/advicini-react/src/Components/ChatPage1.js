import React, { useState, useEffect } from 'react';
import { useChat } from './ChatContext';
import './Chat1.css'; 

const ChatPage1 = () => {
    const { messages, addMessage } = useChat();
    const [input, setInput] = useState('');

    // Ajouter un message d'accueil automatique
    useEffect(() => {
        if (messages.length === 0) {
            addMessage({ id: Date.now(), sender: 'ADVICINI', text: 'Bonjour ! Bienvenue chez ADVICINI. Comment pouvons-nous vous aider aujourd\'hui ?' });
        }
    }, [messages, addMessage]);

    const handleSend = () => {
        if (input.trim()) {
            addMessage({ id: Date.now(), sender: 'Vous', text: input });
            setInput('');
        }
    };

    return (
        <div className="chat-container">
            {/* En-tête professionnel */}
            <div className="chat-header">
                <img src="https://img.icons8.com/?size=100&id=pUBYZOd6qK9d&format=png&color=000000" alt="Logo ADVICINI" className="chat-logo" />
                <h2>Assistance ADVICINI</h2>
            </div>

            {/* Liste des messages */}
            <div className="message-list">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.sender === 'ADVICINI' ? 'message-advicini' : 'message-user'}`}
                    >
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>

            {/* Formulaire d'envoi de message */}
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question ici..."
                />
                <button onClick={handleSend} className="send-button">
                    <span role="img" aria-label="send">📤</span> Envoyer
                </button>
            </div>
        </div>
    );
};

export default ChatPage1;
