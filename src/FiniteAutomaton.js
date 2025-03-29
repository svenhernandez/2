class FiniteAutomaton {
    constructor() {
      this.states = new Set();
      this.initial = "";
      this.finalStates = new Set();
      this.transitions = {};
      this.errorState = "-";
    }
    addTransition(fromState, symbol, toState) {
      if (!fromState || !toState || !symbol) return; // Evita transiciones inválidas
  
      if (!this.transitions[fromState]) {
        this.transitions[fromState] = {};
      }
      if (!this.transitions[fromState][symbol]) {
        this.transitions[fromState][symbol] = new Set();
      }
      this.transitions[fromState][symbol].add(toState);
  
      console.log(`Transición añadida: ${fromState} -> ${symbol} -> ${toState}`);
    }
  
    getEpsilonClosure(state, visited = new Set()) {
      if (visited.has(state) || state === this.errorState) return visited;
      visited.add(state);
  
      const epsilonTransitions = this.transitions[state]?.["ε"];
      if (epsilonTransitions) {
        for (const nextState of epsilonTransitions) {
          this.getEpsilonClosure(nextState, visited);
        }
      }
  
      console.log(`Cierre épsilon de ${state}:`, [...visited]);
      return visited;
    }
  
    convertTransitionsToArrays() {
      const newTransitions = {};
      for (const [state, trans] of Object.entries(this.transitions)) {
        newTransitions[state] = {};
        for (const [symbol, states] of Object.entries(trans)) {
          newTransitions[state][symbol] = [...states]; // Convertir Set a Array
        }
      }
      return newTransitions;
    }
  
    evaluateStr(str, currentStates = this.getEpsilonClosure(this.initial), currentIndex = 0) {
      console.log("🔹 Estado inicial:", this.initial);
      console.log("🔹 Estados finales:", [...this.finalStates]);
      console.log(
        "🔹 Transiciones actuales:",
        JSON.stringify(this.convertTransitionsToArrays(), null, 2)
      );
      console.log("🔹 Cierre épsilon del estado inicial:", this.getEpsilonClosure(this.initial));
  
      if (currentIndex >= str.length) {
        console.log("Fin de la cadena. Estados actuales:", [...currentStates]);
  
        const isAccepted = [...currentStates].some((state) =>
          this.finalStates.has(state)
        );
  
        console.log(`Cadena terminada, ¿aceptada?: ${isAccepted}`);
        return isAccepted;
      }
  
      let nextStates = new Set();
      for (const state of currentStates) {
        if (state === this.errorState) continue;
  
        console.log(`Estado ${state}, buscando transiciones con "${str[currentIndex]}"`);
  
        const possibleTransitions =
          this.transitions[state]?.[str[currentIndex]] || new Set();
        console.log(`Transiciones encontradas desde ${state}:`, [...possibleTransitions]);
  
        for (const nextState of possibleTransitions) {
          if (nextState === this.errorState) return false;
          this.getEpsilonClosure(nextState).forEach((s) => nextStates.add(s));
        }
      }
  
      console.log(`Estados alcanzables después de "${str[currentIndex]}":`, [...nextStates]);
  
      let allNextStates = new Set();
      nextStates.forEach((state) => {
        this.getEpsilonClosure(state).forEach((s) => allNextStates.add(s));
      });
  
      console.log("Estados después de cierre épsilon:", [...allNextStates]);
  
      return (
        allNextStates.size > 0 &&
        this.evaluateStr(str, allNextStates, currentIndex + 1)
      );
    }
  
    setInitialState(state) {
      this.initial = state;
      this.states.add(state);
    }
  
    setFinalStates(states) {
      this.finalStates = new Set(states);
      states.forEach((state) => this.states.add(state));
    }
  }
  
  export default FiniteAutomaton;