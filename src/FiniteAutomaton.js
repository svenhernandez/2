class FiniteAutomaton {
    constructor() {
        this.initial = "";
        this.finalStates = new Set(); // Usamos Set para eficiencia
        this.transitions = {};
        this.errorState = "-"; // Estado de error
    }

    addTransition(fromState, symbol, toState) {
        this.transitions[fromState] ??= {};
        this.transitions[fromState][symbol] ??= new Set();
        this.transitions[fromState][symbol].add(toState);
    }

    /**
     * Obtiene el cierre epsilon (ε) de un estado, es decir, todos los estados
     * alcanzables mediante transiciones ε, incluyendo el estado inicial dado.
     */
    getEpsilonClosure(state, visited = new Set()) {
        if (visited.has(state) || state === this.errorState) return visited;
        visited.add(state);

        const epsilonTransitions = this.transitions[state]?.["ε"] || [];
        for (const nextState of epsilonTransitions) {
            this.getEpsilonClosure(nextState, visited);
        }

        return visited;
    }

    /**
     * Evalúa si una cadena es aceptada por el autómata, considerando transiciones ε y estados de error.
     */
    evaluateStr(str, currentStates = this.getEpsilonClosure(this.initial), currentIndex = 0) {
        if (currentIndex >= str.length) {
            return [...currentStates].some(state => this.finalStates.has(state));
        }

        let nextStates = new Set();

        for (const state of currentStates) {
            if (state === this.errorState) continue; // Ignoramos el estado de error

            const possibleTransitions = this.transitions[state]?.[str[currentIndex]] || [];
            for (const nextState of possibleTransitions) {
                if (nextState === this.errorState) return false; // Si llegamos a un estado de error, detener evaluación
                this.getEpsilonClosure(nextState).forEach(s => nextStates.add(s));
            }
        }

        return nextStates.size > 0 && this.evaluateStr(str, nextStates, currentIndex + 1);
    }

    setInitialState(state) {
        this.initial = state;
    }

    setFinalStates(states) {
        this.finalStates = new Set(states); // Guardamos como Set para búsquedas más rápidas
    }
}

export default FiniteAutomaton;
