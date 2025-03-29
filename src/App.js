import React, { useState } from "react";
import AutomataInput from "./components/AutomataInput";
import TransitionInput from "./components/TransitionInput";
import StringInput from "./components/StringInput";
import ResultDisplay from "./components/ResultDisplay";
import AutomataGraph from "./components/AutomataGraph";
import FiniteAutomaton from "./FiniteAutomaton";
import "./App.css";

const App = () => {
    const [automaton, setAutomaton] = useState(null);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);  // 🔹 Guardar historial de cadenas evaluadas

    const handleAutomataSubmit = (data) => {
        const newAutomaton = new FiniteAutomaton();
        newAutomaton.setInitialState(data.initialState);
        newAutomaton.setFinalStates(data.finalStates);

        // Configurar las transiciones
        newAutomaton.addTransition("q0", "a", "q1");
        newAutomaton.addTransition("q0", "ε", "q2");
        newAutomaton.addTransition("q1", "a", "q3");
        newAutomaton.addTransition("q2", "b", "q3");
        newAutomaton.addTransition("q3", "a", "q3");
        newAutomaton.addTransition("q3", "b", "q3");
        newAutomaton.addTransition("q0", "b", "q2");
        newAutomaton.addTransition("q1", "a", "q0");
        newAutomaton.addTransition("q2", "ε", "q3"); 
        newAutomaton.addTransition("q0", "a", "q0"); 
        newAutomaton.addTransition("q0", "b", "q1"); 
        newAutomaton.addTransition("q0", "b", "q0"); 
        newAutomaton.addTransition("q1", "b", "q1"); 
        newAutomaton.addTransition("q2", "c", "q3");
        newAutomaton.addTransition("q2", "b", "q2");
        newAutomaton.addTransition("q1", "b", "q2");
        newAutomaton.addTransition("q0", "ε", "q1");
        newAutomaton.addTransition("q1", "a", "q1");
        newAutomaton.addTransition("q2", "a", "q1");

        setAutomaton(newAutomaton);
        setHistory([]);  // 🔹 Limpiar historial cuando se reinicia el autómata
    };

    const handleEvaluate = (inputString) => {
        if (automaton) {
            const isAccepted = automaton.evaluateStr(inputString);
            setResult(isAccepted);

            // 🔹 Guardar la cadena en el historial
            setHistory(prevHistory => [...prevHistory, { input: inputString, accepted: isAccepted }]);
        }
    };

    return (
        <div className="App">
            <h1>Evaluador de Autómatas Finitos</h1>
            <AutomataInput onAutomataSubmit={handleAutomataSubmit} />
            <TransitionInput onTransitionSubmit={() => {}} />
            <StringInput onEvaluate={handleEvaluate} />
            {result !== null && <ResultDisplay result={result} />}
            
            <h2>Historial de Evaluaciones</h2>
            <ul>
                {history.map((entry, index) => (
                    <li key={index} style={{ color: entry.accepted ? "green" : "red" }}>
                        {entry.input} → {entry.accepted ? " Aceptada" : " Rechazada"}
                    </li>
                ))}
            </ul>

            <h2>Visualización del Autómata</h2>
            <AutomataGraph automaton={automaton} />
        </div>
    );
};

export default App;