import {check, checkCompleted, initialiseBoard, validateInput} from "../../utils/sudoku/logic/SudokuLogic";
import {createBoardFromSolution, createProblem, isUnSat, newBoard} from "../../utils/solver/logic/SolverLogic";
import axios from "axios";

// Constants to be used in Actions and Reducers
export const CREATE_BOARD = "CREATE_BOARD";
export const UPDATE_CELL = "UPDATE_CELL";
export const CLEAR_BOARD = "CLEAR_BOARD";
export const CLEAR_BOARD_PROTECTED = "CLEAR_BOARD_PROTECTED";
export const CLEAR_BOARD_SOLVER = "CLEAR_BOARD_SOLVER";
export const SELECT_CELL = "SELECT_CELL";
export const PROTECT_CELL = "PROTECT_CELL";
export const CHECK_BOARD = "CHECK_BOARD";
export const INTERPRET_SUCCESS = "INTERPRET_SUCCESS";
export const INTERPRET_FAILURE = "INTERPRET_FAILURE";
export const NEW_PENDING = "NEW_PENDING";
export const NEW_SUCCESS = "NEW_SUCCESS";
export const NEW_FAILURE = "NEW_FAILURE";

// Create board action, that creates a new board of the size of the dimensions passed
export function createBoard(dimensions) {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: CREATE_BOARD, board: initialiseBoard(dimensions), dimension: dimensions}))
    });
}

// Updates the value of a given cell and validates the input
export function updateCell(x, y, inputValue, dim) {
    // Validate the input value
    let input = validateInput(inputValue, dim);
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: UPDATE_CELL, x: x, y: y, value: input}))
    })
}

// Clears the entire board except for protected cells
export function clearBoard() {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: CLEAR_BOARD}))
    })
}

// Clears the entire board including protected cells
export function clearBoardProtected() {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: CLEAR_BOARD_PROTECTED}))
    })
}

// Clears only the solver inputs
export function clearBoardSolver() {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: CLEAR_BOARD_SOLVER}))
    })
}

// Updates the cell position that has been clicked on to the current selected cell
export function updateSelectedCell(x, y) {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: SELECT_CELL, x: x, y: y}))
    })
}

// Protects the currently selected cell
export function protectCell() {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: PROTECT_CELL}))
    })
}

// Checks user's progress on board
export function checkPuzzle(board) {
    return dispatch => new Promise(resolve => {
        // Check if the board has been completed and if it has return a congratulations message
        if (checkCompleted(board)) {
            return resolve(dispatch({
                type: CHECK_BOARD,
                message: "Puzzle is completed, congratulations!",
                error: false
            }))
        }
            // Else check if there is any mistakes in the board completion so far
        // If no mistakes are found, return no mistakes found
        else if (check(board)) {
            return resolve(dispatch({type: CHECK_BOARD, message: "No mistakes so far", error: false}))
        }
        // Else return an error was found
        return resolve(dispatch({type: CHECK_BOARD, message: "There seems to be a mistake", error: true}))
    })
}

// Interpret solution into Sudoku puzzle
export function interpretModel(solution, dim, board) {
    // Check if it is satisfiable
    if (isUnSat(solution)) {
        // Return board can't be interpreted
        return dispatch => new Promise(resolve => {
            return resolve(dispatch({type: INTERPRET_FAILURE, message: "Model is unsatisfiable"}))
        });
    }
    // Create board from new solution
    let newBoard = createBoardFromSolution(solution, dim, board);

    // Return solved board
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: INTERPRET_SUCCESS, board: newBoard, message: "Successfully interpreted model"}))
    });
}

export function newPuzzle(solver, dim, num) {
    return dispatch => new Promise(resolve => {
        resolve(dispatch({type: NEW_PENDING}));
        let board = addRandomValue(initialiseBoard(dim), dim);

        return axios.post(`http://localhost:9000/api/solve/${solver}`, createProblem(board, dim, true))
            .then(response => {
                let solution = response.data;
                if (isUnSat(solution)) resolve(dispatch({type: NEW_FAILURE}));
                else resolve(dispatch({type: NEW_SUCCESS, board: newBoard(solution, dim, num), dim: dim}));
            }).catch(err => {
                resolve(dispatch({type: NEW_FAILURE}))
            });
    })
}

const addRandomValue = (board, dim) => {
    let dims = dim * dim;
    let row = Math.floor(Math.random() * dims);
    let col = Math.floor(Math.random() * dims);

    board[row][col].value = Math.round(Math.random() * dims);

    return board
};