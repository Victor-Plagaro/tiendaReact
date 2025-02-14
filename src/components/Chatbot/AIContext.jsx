import React, { createContext, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import products from '../../../products.json';

// Accede a tu API key directamente
const genAI = new GoogleGenerativeAI("AIzaSyCJaa82QqFqKRatvHUAkOtpdc4pWnNdQfA");

export const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    { role: "user", text: "" }, 
    { role: "model", text: "¡Bienvenido a nuestra tienda! ¿En qué puedo ayudarte hoy?" }
  ]);
  

  const sendMessage = async (input, role = "user") => {
    const newMessage = { role, text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (role === "user") {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const chat = model.startChat({
        history: [...messages, newMessage].map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        })),
        generationConfig: {
          maxOutputTokens: 100,
        },
      });

      const result = await chat.sendMessage(input);
      const response = await result.response;
      const text = await response.text();

      setMessages((prevMessages) => [...prevMessages, { role: "model", text }]);
    }
  };

  return (
    <AIContext.Provider value={{ messages, sendMessage, products }}>
      {children}
    </AIContext.Provider>
  );
};