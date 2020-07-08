import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faLightbulb, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";

// As default export a function that takes in props and returns the buttons for the main puzzle page
export default props => {
    // Props passed from parent
    // clearBoard - a function to clear the board
    // check - a function to check the current board for errors in the Sudoku logic
    // board - the current board
    // hint - a function to add a hint to the board
    // dim - dimensions of the board
    // solver - name of solver to be used to get a hint
    // newPuzzle - a function to create a new puzzle
    // status - status of new puzzle
    // numInputs - number of inputs to create a new puzzle with
    const {clearBoard, check, board, dim, solver, hint, newPuzzle, status, numInputs} = props;
    return (
        <div className={"puzzle-buttons"}>
            <button className={"button"} onClick={() => newPuzzle(solver, dim, numInputs)}>
                {getIcon(status)} New
            </button>
            <button className={"button"} onClick={() => clearBoard()}>
                <FontAwesomeIcon icon={faTrash}/> Clear
            </button>
            <button className={"button"} onClick={() => hint(board, solver, dim)}>
                <FontAwesomeIcon icon={faLightbulb}/> Hint
            </button>
            <button className={"button"} onClick={() => check(board)}>
                <FontAwesomeIcon icon={faCheck}/> Check
            </button>
        </div>
    )
}

const getIcon = (status) => {
    return status === "pending" ? <FontAwesomeIcon icon={faSpinner} spin/> :
        <FontAwesomeIcon icon={faPlus}/>
};
