import React, { createContext, useContext, useState } from 'react';

const MessagesContext = createContext();

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const setMessagesArray = (messagesArray) => {
    setMessages(messagesArray);
  };

  return (
    <MessagesContext.Provider value={{
      messages,
      setMessages: setMessagesArray,
      addMessage,
      isTyping,
      setIsTyping
    }}>
      {children}
    </MessagesContext.Provider>
  );
};