import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div>
      <h3>Resultado:</h3>
      <p>{result ? "La cadena es aceptada" : "La cadena NO es aceptada"}</p>
    </div>
  );
};

export default ResultDisplay;