import React from 'react';

// As default export a function that takes in props and returns a cell
export default props => {
    // Props passed from parent
    // row - the index of the row the cell is located at
    // col - the index of the column the cell is located at
    // handleInput - a function to handle the on change event
    // handleOnClick - a function to handle the on click event
    // item - an object containing the value of the cell and if it is protected or not
    // dim - the dimension of th board
    const {row, col, handleInput, handleOnClick, item, dim} = props;

    // If the cell is in an odd box, then shaded the cell
    let className = isOdd(row, col, dim) ? "shaded" : "";
    // Build up the validation regex using the board dimensions
    let regex = inputValidationRegex(dim);
    // Return an input field using the passed props from the parent
    return <input key={`${row}:${col}`}
                  className={getClassName(item.solver, className)}
                  readOnly={item.protected}
                  type={"text"}
                  maxLength={(dim <= 3) ? "1" : "2"}
                  value={item.value}
                  onClick={() => handleOnClick(row, col)}
                  onChange={e => handleInput(row, col, e.target.value.replace(regex, ''), dim)}
    />
}

// Check if the cell is in odd or even box depending on the dimensions of the board
// Logic: if the column is even and the row is even OR if the column is odd and the row is odd, then the cell is
//        in an odd box
const isOdd = (row, col, dim) => (Math.floor(col / dim) % 2 === 0 && Math.floor(row / dim) % 2 === 0)
    || (Math.floor(col / dim) % 2 !== 0 && Math.floor(row / dim) % 2 !== 0);

// Validate the user input depending on the dimensions of the board
function inputValidationRegex(dim) {
    // Get the board dimensions
    let dims = dim * dim;
    // If the board is less than or equal to 9 then, Regex: Only allow numbers from 1 - dimension
    // Else if the board is greater than 9, Regex: Only allow numbers from 0-9
    let regex = (dims <= 9) ? `[^1-${dims}]` : `[^0-9]`;
    // Return a regular expression to replace any value that is not allowed by the regex with a blank space
    return new RegExp(regex, "g");
}

const getClassName = (isSolver, className) => isSolver ? className + " solver" : className;