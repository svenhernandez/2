import React, { useState } from "react";

const TransitionInput = ({ onTransitionSubmit }) => {
  const [fromState, setFromState] = useState("");
  const [symbol, setSymbol] = useState("");
  const [toState, setToState] = useState("");
  const [transitions, setTransitions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!fromState.trim() || !toState.trim() || symbol.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const newTransition = {
      fromState: fromState.trim(),
      symbol: symbol.trim() === "ε" ? "ε" : symbol.trim(),
      toState: toState.trim(),
    };

    // Agregar transición a la lista
    setTransitions([...transitions, newTransition]);
    onTransitionSubmit(newTransition);

    // Limpiar los inputs
    setFromState("");
    setSymbol("");
    setToState("");
  };

  return (
    <div>
      <h2>Agregar Transiciones</h2>
      <form onSubmit={handleSubmit}>
        <label>Desde:</label>
        <input type="text" value={fromState} onChange={(e) => setFromState(e.target.value)} />

        <label>Símbolo (usar "ε" para transición vacía):</label>
        <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />

        <label>Hacia:</label>
        <input type="text" value={toState} onChange={(e) => setToState(e.target.value)} />

        <button type="submit">Agregar Transición</button>
      </form>

      {transitions.length > 0 && (
        <div>
          <h3>Transiciones Agregadas:</h3>
          <ul>
            {transitions
              .filter(t => t && t.fromState && t.toState) // Filtramos transiciones inválidas
              .map((t, index) => (
                <li key={index}>
                  {t.fromState} -- {t.symbol} → {t.toState}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransitionInput;
