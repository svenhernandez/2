import React, { useState } from "react";

const AutomataInput = ({ onAutomataSubmit }) => {
  const [states, setStates] = useState("");
  const [initialState, setInitialState] = useState("");
  const [finalStates, setFinalStates] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const stateList = states.split(",").map(s => s.trim()).filter(s => s);
    const finalStateList = finalStates.split(",").map(s => s.trim()).filter(s => s);

    if (!initialState || stateList.length === 0) {
      alert("Por favor, ingresa al menos un estado y un estado inicial.");
      return;
    }

    onAutomataSubmit({ states: stateList, initialState, finalStates: finalStateList });
  };

  return (
    <div>
      <h2>Configurar Autómata</h2>
      <form onSubmit={handleSubmit}>
        <label>Estados (separados por coma):</label>
        <input type="text" value={states} onChange={(e) => setStates(e.target.value)} />
        
        <label>Estado Inicial:</label>
        <input type="text" value={initialState} onChange={(e) => setInitialState(e.target.value)} />
        
        <label>Estados Finales (separados por coma):</label>
        <input type="text" value={finalStates} onChange={(e) => setFinalStates(e.target.value)} />
        
        <button type="submit">Guardar Autómata</button>
      </form>

      {states && (
        <div>
          <h3>Vista previa:</h3>
          <p><strong>Estados:</strong> {states}</p>
          <p><strong>Inicial:</strong> {initialState}</p>
          <p><strong>Finales:</strong> {finalStates}</p>
        </div>
      )}
    </div>
  );
};

export default AutomataInput;
