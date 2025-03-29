import React, { useState } from "react";

const TransitionInput = ({ onTransitionSubmit }) => {
  const [from, setFrom] = useState("");
  const [symbol, setSymbol] = useState("");
  const [to, setTo] = useState("");
  const [transitions, setTransitions] = useState([]);

  const handleAddTransition = () => {
    if (from && symbol && to) {
      const newTransition = { from, symbol, to };
      setTransitions([...transitions, newTransition]);
      setFrom("");
      setSymbol("");
      setTo("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (transitions.length > 0) {
      onTransitionSubmit(transitions);
      setTransitions([]);
    }
  };

  return (
    <div className="transition-input">
      <h3>Agregar Transiciones</h3>
      <div>
        <input
          type="text"
          placeholder="Estado origen (ej. q0)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Símbolo (ej. a, ε)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="text"
          placeholder="Estado destino (ej. q1)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button type="button" onClick={handleAddTransition}>
          Agregar
        </button>
      </div>

      <div className="transitions-list">
        <h4>Transiciones agregadas:</h4>
        <ul>
          {transitions.map((t, i) => (
            <li key={i}>
              {t.from} - {t.symbol} → {t.to}
            </li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={handleSubmit}>
        Confirmar Transiciones
      </button>
    </div>
  );
};

export default TransitionInput;
