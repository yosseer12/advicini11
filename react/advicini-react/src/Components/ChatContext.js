import React, { createContext, useState, useContext, useEffect } from 'react';

const ChatContext = createContext();

export const useChat = () => {
    return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
    // Initialiser les messages depuis localStorage si disponible
    const [messages, setMessages] = useState(() => {
        const savedMessages = localStorage.getItem('messages');
        return savedMessages ? JSON.parse(savedMessages) : [];
    });

    // Mettre à jour localStorage à chaque changement des messages
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    // Ajouter un message et synchroniser automatiquement
    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Synchronisation entre onglets/pages grâce à un listener
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedMessages = JSON.parse(localStorage.getItem('messages')) || [];
            setMessages(updatedMessages); // Mettre à jour l'état local
        };

        // Écoute les modifications de localStorage
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange); // Nettoyer l'écoute
        };
    }, []);

    // Fonction pour réinitialiser les messages (pour l'utilisateur)
    const resetMessages = () => {
        setMessages([]);
    };

    // Fonction pour réinitialiser les messages pour tous les utilisateurs (admin)
    const resetMessagesForAll = () => {
        setMessages([]);
    };

    return (
        <ChatContext.Provider value={{ messages, addMessage, resetMessages, resetMessagesForAll }}>
            {children}
        </ChatContext.Provider>
    );
};
