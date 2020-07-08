import React from "react";
import Box from "./Box";

// As default export a function that takes in props and returns a  Sudoku Board
export default props => {
    // Props passed from parent
    // board - an array of cells containing values to make up the board
    // dimension - the dimensions of the board
    // updateCell - a function to handle when a cell is typed into
    // updateSelectedCell - a function to update which cell is currently selected
    const {board, dimension, updateCell, updateSelectedCell} = props;

    // Return a sudoku board
    return <div className={"board"}> {
        // Map over each row to return a row of cells
        board.map((row, i) => {
            return <div key={i} className={"row"}> {
                // Map over each cell and return a cell box, pass down the relevant props
                row.map((item, j) => {
                    return <Box key={`${i}:${j}`}
                                row={i}
                                col={j}
                                item={item}
                                handleOnClick={updateSelectedCell}
                                handleInput={updateCell}
                                dim={dimension}
                    />
                })}</div>
        })} </div>

}
