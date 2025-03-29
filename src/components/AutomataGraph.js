import ReactFlow, { MiniMap, Controls } from "react-flow-renderer";
import "react-flow-renderer/dist/style.css";

const AutomataGraph = ({ automaton }) => {
  if (!automaton || !automaton.transitions) return <p>No hay autómata definido.</p>;

  console.log("Transiciones procesadas:", automaton.transitions);

  const statesWithTransitions = new Set(
    Object.keys(automaton.transitions).concat(
      ...Object.values(automaton.transitions).flatMap((transitions) =>
        Object.values(transitions).flatMap((toStates) => [...toStates])
      )
    )
  );
  const validStates = new Set(Object.keys(automaton.transitions));
  const filteredStates = [...statesWithTransitions].filter((state) =>
    validStates.has(state)
  );

  const numColumns = Math.ceil(Math.sqrt(filteredStates.length)); // Distribución en cuadrícula

  // Generar nodos solo para los estados que realmente participan en transiciones
  const nodes = filteredStates.map((state, index) => ({
    id: state,
    position: {
      x: (index % numColumns) * 200,
      y: Math.floor(index / numColumns) * 150,
    },
    data: { label: state },
  }));

  // Generar las transiciones como aristas (edges)
  const edges = Object.entries(automaton.transitions).flatMap(
    ([fromState, transitions]) =>
      Object.entries(transitions)
        .filter(([_, toStates]) => toStates && toStates.length > 0) // Filtra transiciones vacías
        .flatMap(([symbol, toStates]) =>
          toStates.map((toState) => ({
            id: `edge-${fromState}-${toState}-${symbol}`,
            source: fromState,
            target: toState,
            label: symbol,
            animated: symbol === "ε", // Resaltar transiciones épsilon
          }))
        )
  );

  console.log("Nodos generados:", nodes);
  console.log("Aristas generadas:", edges);

  return (
    <div style={{ width: "100%", height: "500px", border: "1px solid black" }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default AutomataGraph;