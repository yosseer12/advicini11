import React, { useState } from 'react';
import { useChat } from './ChatContext';
import './Chat2.css';

const ChatPage2 = () => {
    const { messages, addMessage, resetMessagesForAll } = useChat();
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            addMessage({ id: Date.now(), sender: 'Admin', text: input });
            setInput('');
        }
    };

    const handleReset = () => {
        resetMessagesForAll();
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h1>ADVICINI</h1>
                    <p>Messages des Utilisateurs</p>
                </div>
                <nav className="menu">
                    <ul>
                        <li className="active">📩 Messages</li>
                        <li>❗ Réclamations</li>
                        <li>🏚️ Home</li>
                        <li>🚪 Déconnexion</li>
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <main className="main-section">
                {/* Header */}
                <header className="dashboard-header">
                    <h2>Centre de Messagerie</h2>
                    <div className="profile">
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Admin Avatar"
                            className="avatar"
                        />
                        <span>Admin</span>
                    </div>
                </header>

                {/* Chat window */}
                <section className="chat-section">
                    <div className="chat-header">
                        <h3>Discussion en cours</h3>
                    </div>

                    <div className="chat-window">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`message ${message.sender === 'Admin' ? 'admin-message' : 'user-message'}`}
                            >
                                <span className="sender">{message.sender}</span>
                                <p>{message.text}</p>
                                <span className="timestamp">{new Date().toLocaleTimeString()}</span>
                            </div>
                        ))}
                    </div>

                    <div className="input-section">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Écrivez une réponse..."
                        />
                        <button onClick={handleSend}>
                            Envoyer
                        </button>
                        <button onClick={handleReset} className="reset-button">
                            Réinitialiser
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ChatPage2;
