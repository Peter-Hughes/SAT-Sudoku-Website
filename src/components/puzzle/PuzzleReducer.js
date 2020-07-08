import InitialState from "../common/InitialState"
import {
    CHECK_BOARD,
    CLEAR_BOARD,
    CLEAR_BOARD_PROTECTED,
    CLEAR_BOARD_SOLVER,
    CREATE_BOARD,
    INTERPRET_FAILURE,
    INTERPRET_SUCCESS,
    NEW_FAILURE,
    NEW_PENDING,
    NEW_SUCCESS,
    PROTECT_CELL,
    SELECT_CELL,
    UPDATE_CELL
} from "./PuzzleActions";
import produce from 'immer';


export function puzzleReducer(state = InitialState.puzzle, action) {
    switch (action.type) {
        // Create a new board with a copy of state and initial state. Set the new board and new dimension
        case CREATE_BOARD:
            return {...state, ...InitialState.puzzle, board: action.board, dimension: action.dimension};
        // Update the select cell
        case SELECT_CELL:
            return {
                ...state,
                selectedCell: {row: action.x, col: action.y, protected: state.board[action.x][action.y].protected}
            };
        // Update value of cell
        case UPDATE_CELL:
            return produce(state, draft => {
                draft.board[action.x][action.y] = {...draft.board[action.x][action.y], value: action.value}
            });
        // Clear board of all values that aren't protected
        case CLEAR_BOARD:
            return {
                ...state,
                board: state.board.map(row => {
                    return row.map(cell => cell.protected ? cell : {...cell, value: '', protected: false, solver: false}
                    )
                }),
                error: InitialState.puzzle.error,
                message: InitialState.puzzle.message,
                cnfMessage: InitialState.puzzle.cnfMessage
            };
        // Clear board of all values
        case CLEAR_BOARD_PROTECTED:
            return {
                ...state,
                board: state.board.map(row => row.map(cell => {
                    return {...cell, value: '', protected: false, solver: false}
                })),
                error: InitialState.puzzle.error,
                message: InitialState.puzzle.message,
                cnfMessage: InitialState.puzzle.cnfMessage
            };
        case CLEAR_BOARD_SOLVER:
            return {
                ...state,
                board: state.board.map(row => {
                    return row.map(cell => (cell.solver && !cell.protected) ?
                        {...cell, value: '', protected: false, solver: false} : cell)
                }),
                error: InitialState.puzzle.error,
                message: InitialState.puzzle.message,
                cnfMessage: InitialState.puzzle.cnfMessage
            };
        // Protect the currently selected cell
        case PROTECT_CELL:
            return produce(state, draft => {
                draft.selectedCell = {...state.selectedCell, protected: !state.selectedCell.protected};
                draft.board[state.selectedCell.row][state.selectedCell.col] = {
                    ...draft.board[state.selectedCell.row][state.selectedCell.col],
                    protected: !draft.board[state.selectedCell.row][state.selectedCell.col].protected
                }
            });
        // Update if there are any errors and display a message
        case CHECK_BOARD:
            return {...state, message: action.message, error: action.error};
        // Display cnf error message and update errors to true
        case INTERPRET_FAILURE:
            return {...state, cnfMessage: action.message, cnfError: true};
        // Create a copy of state and initial state, update the board with the new board, update cnf message
        // Keep dimensions the same
        case INTERPRET_SUCCESS:
            return {
                ...state,
                ...InitialState.puzzle,
                board: action.board,
                cnfMessage: action.message,
                dimension: state.dimension
            };
        case NEW_PENDING:
            return {...state, status: "pending"};
        case NEW_SUCCESS:
            return {...state, ...InitialState.puzzle, board: action.board, status: "resolved", dimension: action.dim};
        case NEW_FAILURE:
            return {...state, status: "resolved"};
        // Return the state as default
        default:
            return state;
    }
}