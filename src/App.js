import React, { useState } from "react";
import AutomataInput from "./components/AutomataInput";
import TransitionInput from "./components/TransitionInput";
import StringInput from "./components/StringInput";
import ResultDisplay from "./components/ResultDisplay";
import FiniteAutomaton from "./FiniteAutomaton"; // Importa la clase del autómata
import "./App.css";

const App = () => {
  const [automaton, setAutomaton] = useState(null);
  const [result, setResult] = useState(null);

  const handleAutomataSubmit = (data) => {
    const newAutomaton = new FiniteAutomaton();
    newAutomaton.setInitialState(data.initialState);
    newAutomaton.setFinalStates(data.finalStates);
    setAutomaton(newAutomaton);
  };

  const handleTransitionSubmit = (transition) => {
    if (automaton) {
      const symbol = transition.symbol.trim() === "ε" ? "ε" : transition.symbol.trim();
      automaton.addTransition(transition.fromState, symbol, transition.toState);
    }
  };

  const handleEvaluate = (inputString) => {
    if (automaton) {
      const isAccepted = automaton.evaluateStr(inputString);
      setResult(isAccepted);
    }
  };

  return (
    <div className="App">
      <h1>Evaluador de Autómatas Finitos</h1>
      <AutomataInput onAutomataSubmit={handleAutomataSubmit} />
      <TransitionInput onTransitionSubmit={handleTransitionSubmit} />
      <StringInput onEvaluate={handleEvaluate} />
      {result !== null && <ResultDisplay result={result} />}
    </div>
  );
};

export default App;