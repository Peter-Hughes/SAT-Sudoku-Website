// Validate the user input is correct for the dimensions
export function validateInput(input, dim) {
    if (input <= 0) return '';
    return (input <= dim * dim) ? input : (input.length === 1) ? '' : input.slice(0, 1);
}

// Initialise the Board
export function initialiseBoard(dimension) {
    // Set the size of the board as the dimension squared
    let size = dimension * dimension;

    // Create a 2d array the using the size, and fill it with empty cells
    let board = Array(size).fill(0).map(() => Array(size).fill({
        value: '',
        protected: false,
        solver: false
    }));

    return addBoxesToBoard(board, dimension)
}

// For each cell calculate which box it is in and add it as a group to the cell
const addBoxesToBoard = (board, dim) => board.map((row, x) => {
    return row.map((cell, y) => {
        return {...cell, group: calculateBox(x, y, dim)};
    })
});

// Box is calculated is done using the board dimensions and returns the box the cell is in
export const calculateBox = (x, y, dim) => Math.floor(y / dim) + Math.floor(x / dim) * dim;

// Check how the user is currently doing, removes unique
export function check(board) {
    // Check if all the rows are unique
    let isRowsUnique = board.map(row => checkIfUnique(removeEmptyCells(row)));

    // Check if all the columns are unique
    let isColsUnique = board.map((_, index, arr) => getColumn(arr, index))
        .map(col => checkIfUnique(removeEmptyCells(col)));

    // Check if all the boxes are unique
    let isBoxUnique = board.map((_, index, arr) => getGroupByIndex(arr, index))
        .map(box => checkIfUnique(removeEmptyCells(box)));

    // Check if every row, column and box are unique
    return isBoxUnique.every(x => x) && isRowsUnique.every(x => x) && isColsUnique.every(x => x)
}

// Remove any empty cells
export const removeEmptyCells = arr => arr.filter(cell => cell.value !== '');

// Check if the array passed contains only unique values
export const checkIfUnique = (cells) => new Set(cells.map(x => x.value)).size === cells.length;

// Extract the columns from the board
export const getColumn = (arr, column) => arr.map(row => row[column]);

// Extract a box from the array where the box is equal to the index
export const getGroupByIndex = (arr, index) => arr.flatMap(x => x.filter(cell => cell.group === index));

// Check if board passed has been fully completed correctly
export function checkCompleted(board) {
    // Check if the board is filled in
    let checkEmpty = board.map(row => removeEmptyCells(row).length === row.length);

    // Check if the board is filled and if all rows, columns and boxes are unique
    return checkEmpty.every(x => x) && check(board)
}
