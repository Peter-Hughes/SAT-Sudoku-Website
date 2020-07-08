import {addHint, createBoardFromSolution, createProblem, isUnSat} from "../../utils/solver/logic/SolverLogic";
import axios from "axios";
import {INTERPRET_FAILURE, INTERPRET_SUCCESS} from "../puzzle/PuzzleActions";

// Constants to be used in Actions and Reducers
export const UPDATE_SOLUTION = "UPDATE_SOLUTION";
export const UPDATE_PROBLEM = "UPDATE_PROBLEM";
export const SOLVE_PENDING = "SOLVE_PENDING";
export const SOLVE_SUCCESS = "SOLVE_SUCCESS";
export const SOLVE_FAILURE = "SOLVE_FAILURE";
export const UPDATE_CNF_BOOL = "UPDATE_CNF_BOOL";

// Update the solution text
export function updateSolution(input) {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: UPDATE_SOLUTION, solution: input}))
    });
}

// Update the problem CNF for a given board and dimension
export function updateProblem(board, dim, isFull) {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: UPDATE_PROBLEM, problem: createProblem(board, dim, isFull)}))
    });
}

// Update the boolean to use full or simple cnf for the problem model
export function updateCnfBool() {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: UPDATE_CNF_BOOL}))
    });
}

// Get solution for a given board, solver name and dimensions of the board and interpret solution
export function solve(board, solver, dim) {
    return getSolution(board, solver, dim, handleSolveResponse)
}

// Get hint for a given board, solver name and dimensions of the board and add a hint
export function hint(board, solver, dim) {
    return getSolution(board, solver, dim, handleHintResponse)
}

// Get response from solver
function getSolution(board, solver, dim, handleResponse) {
    return dispatch => new Promise(resolve => {
        resolve(dispatch({type: SOLVE_PENDING}));
        let problem = createProblem(board, dim, true);
        return axios.post(`http://localhost:9000/api/solve/${solver}`, problem)
            .then(response => {
                handleResponse(resolve, dispatch, problem, response, dim, board)
            }).catch(err => {
                resolve(dispatch({type: SOLVE_FAILURE, problem: problem, message: "Solver encountered an error"}))
            });
    })
}

// Handle response from solver
function handleSolveResponse(resolve, dispatch, problem, response, dim, board) {
    if (response.status === 200) {
        let solution = response.data;
        resolve(dispatch({type: SOLVE_SUCCESS, problem: problem, solution: solution}));
        if (isUnSat(solution)) resolve(dispatch({type: INTERPRET_FAILURE, message: "Model is unsatisfiable"}));
        else resolve(dispatch({type: INTERPRET_SUCCESS, board: createBoardFromSolution(solution, dim, board)}));
    } else resolve(dispatch({type: SOLVE_FAILURE, problem: problem, message: "Solver encountered an error"}))
}

// Handle response from solver with hint
function handleHintResponse(resolve, dispatch, problem, response, dim, board) {
    if (response.status === 200) {
        let solution = response.data;
        resolve(dispatch({type: SOLVE_SUCCESS, problem: problem, solution: solution}));
        if (isUnSat(solution)) resolve(dispatch({type: INTERPRET_FAILURE, message: "There seems to be a mistake"}));
        else resolve(dispatch({type: INTERPRET_SUCCESS, board: addHint(solution, dim, board)}));
    } else resolve(dispatch({type: SOLVE_FAILURE, problem: problem, message: "Solver encountered an error"}))
}