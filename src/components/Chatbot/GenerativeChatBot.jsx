import React, { useContext, useState } from 'react';
import { AIContext } from './AIContext';
import "./generativechatbot.css";

const GenerativeChatBot = () => {
  const { messages, sendMessage, products } = useContext(AIContext);
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default GenerativeChatBot;