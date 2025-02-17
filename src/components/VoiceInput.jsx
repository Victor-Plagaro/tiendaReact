import React, { useState, useEffect } from "react";
import 'regenerator-runtime/runtime'; // reconocimiento por voz
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./styles/VoiceInput.css";

const VoiceInput = () => {
  const [text, setText] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(text);
    setText("");
    resetTranscript();
  };

  const handleStartListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="speech-container">
      <h2 className="Voz">Reconocimiento de voz</h2>
      <form onSubmit={handleSubmit} className="voice-input-form">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Escribe o usa el micrófono"
          className="speech-input"
        />
        <button type="submit" className="speech-button send">Enviar</button>
      </form>
      <div className="speech-buttons">
        <button
          onClick={handleStartListening}
          className={`speech-button ${listening ? "listening" : "listen"}`}
        >
          {listening ? "Escuchando..." : "Hablar"}
        </button>
        <button
          onClick={handleStopListening}
          className="speech-button stop"
        >
          Detener
        </button>
        <button onClick={resetTranscript} className="speech-button reset">Reset</button>
      </div>
      {submittedText && (
        <div className="submitted-text">
          <strong>Texto enviado:</strong>
          <p>{submittedText}</p>
        </div>
      )}
      <p>{transcript}</p>
    </div>
  );
};

export default VoiceInput;