import InitialState from "../common/InitialState";
import {
    SOLVE_FAILURE,
    SOLVE_PENDING,
    SOLVE_SUCCESS,
    UPDATE_CNF_BOOL,
    UPDATE_PROBLEM,
    UPDATE_SOLUTION
} from "./CnfActions";

// Export the CNF reducer with state set to the initial state for CNF
export function cnfReducer(state = InitialState.cnf, action) {
    // Switch statement for the type of action calling the reducer
    switch (action.type) {
        // Update the state with a new solution value
        case UPDATE_SOLUTION:
            return {...state, solution: action.solution};
        // Update the state with a cnf problem
        case UPDATE_PROBLEM:
            return {...state, problem: action.problem};
        case SOLVE_PENDING:
            return {...state, status: "pending"};
        // Update solve success
        case SOLVE_SUCCESS:
            return {...state, problem: action.problem, solution: action.solution, message: "", status: "resolved"};
        // Update solve failure
        case SOLVE_FAILURE:
            return {...state, problem: action.problem, solution: "", message: action.message, status: "resolved"};
        // Invert the boolean condition of full cnf status
        case UPDATE_CNF_BOOL:
            return {...state, isFull: !state.isFull};
        // Return the current state
        default:
            return state;
    }
}