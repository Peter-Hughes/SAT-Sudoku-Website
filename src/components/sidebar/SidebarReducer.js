import InitialState from "../common/InitialState"
import {
    CHANGE_NUM_INPUT,
    CHANGE_SOLVER,
    GET_SOLVERS_FAILURE,
    GET_SOLVERS_SUCCESS,
    UPDATE_VISIBILITY
} from "./SidebarActions";

export function sidebarReducer(state = InitialState.sidebar, action) {
    switch (action.type) {
        case UPDATE_VISIBILITY:
            return {...state, visible: !state.visible};
        // Update the list of solvers
        case GET_SOLVERS_SUCCESS:
            return {...state, solvers: action.solvers, solver: action.solver};
        // Update the list of solvers
        case GET_SOLVERS_FAILURE:
            return {...state, solvers: action.solvers};
        // Change selected solver
        case CHANGE_SOLVER:
            return {...state, solver: action.solver};
        // Change number of inputs for new puzzle
        case CHANGE_NUM_INPUT:
            return {...state, numInputs: action.num};
        // Return default state
        default:
            return state
    }
}