import {Rules} from "../Rules";
import {initialiseBoard} from "../../sudoku/logic/SudokuLogic";

// Check solution is unsatisfiable
export const isUnSat = solution => solution.includes("s UNSATISFIABLE") || solution.includes("UNSAT") ||
    !solution.includes("SAT");

// Create board from solution
export function createBoardFromSolution(solution, dim, oldBoard) {
    // Extract values from the solution
    let values = extractValues(solution, dim);
    // Initialise a new empty board and then add old board values
    let board = initialiseBoard(dim).map((row, rIndex) => {
        return row.map((_, cIndex) => {
            return {...oldBoard[rIndex][cIndex]}
        })
    });
    // Populate the board with the solved values
    values.forEach(val => {
        if (board[val[0] - 1][val[1] - 1].value === "") board[val[0] - 1][val[1] - 1].solver = true;
        board[val[0] - 1][val[1] - 1].value = val[2].toString();
    });

    return board
}

// Extract only the correct values from the solution
export const extractValues = (solution, dim) => {
    return solution.split("\n")
        .filter(line => line.startsWith("v"))
        .flatMap(line => line.split(" "))
        .filter(item => !isNaN(item) && item > 0)
        .map(num => extractNum(num, dim));
};

// Extract the row, col and value from a given number
// Returns array of [row, column, val]
function extractNum(value, dim) {
    // If dimensions is less than 3, then the number is just the row,col,val so the number can be split and returned
    if (dim < 3) return value.split("", 3);
    // For a dimension greater than 3 the number is a sum of the row, column and val encoded
    // Calculate the row value
    let row = calcRow(dim);
    // Calculate the column value
    let column = calcCol(dim);
    // Return array of [row, column, val]
    // Row - Rounded down value divided by the row calculated value
    // Col - Rounded down value of the remainder of row division, divided by the column calculated value
    // Val - Remainder after row and column division
    return [
        Math.floor(value / row),
        Math.floor((value % row) / column),
        (value % row) % column
    ]
}

// Given a row, col, value and dimension, return the encoded number
export function createNum(row, col, value, dim) {
    // If dimension is less than 3, return the string of the numbers combined
    // Else return the sum of the encoded values
    return dim < 3 ? `${row}${col}${value}` : `${(row * calcRow(dim)) + (col * calcCol(dim)) + parseInt(value)}`;
}

// Row is encoded as the column sum squared
export const calcRow = dim => calcCol(dim) * calcCol(dim);
// Column is calculated as the dimensions squared + 1
export const calcCol = dim => dim * dim + 1;

// Create the problem CNF for a given board and dimension
export function createProblem(board, dim, isFull) {
    // Calculate board dimensions
    let dims = dim * dim;
    // Create rules class from the dimensions
    let rules = new Rules(dims);
    // For the dimensions of the Sudoku puzzle
    for (let i = 1; i <= dims; i++) {
        for (let j = 1; j <= dims; j++) {
            // Add each of the rules for the problem
            rules.addCells(i, j, dim, dims, isFull);
            rules.addBoxes(i, j, dim, dims);
            rules.addRows(i, j, dim, dims, isFull);
            rules.addColumns(i, j, dim, dims, isFull);
        }
    }
    // Add input rules
    rules.addInputs(board, dim);
    // Return the problem CNF of the Sudoku puzzle
    return rules.problem(isFull);
}

export function addHint(solution, dim, oldBoard) {
    // Extract values from the solution
    let values = extractValues(solution, dim);
    // Initialise a new empty board and then add old board values
    let board = initialiseBoard(dim).map((row, rIndex) => {
        return row.map((_, cIndex) => {
            return {...oldBoard[rIndex][cIndex]}
        })
    });
    // add hint to board
    for (let i = 0; i < values.length; i++) {
        let val = values[i];
        if (board[val[0] - 1][val[1] - 1].value === '') {
            board[val[0] - 1][val[1] - 1].value = val[2].toString();
            board[val[0] - 1][val[1] - 1].solver = true;
            break;
        }
    }

    return board
}

export function newBoard(solution, dim, num) {
    if(num > 0 && num <= (Math.pow(dim, 4))) return newBoardInputNumber(solution, dim, num);

    // create empty board
    let board = initialiseBoard(dim);
    // return if board dimension is 1
    if(dim === 1) return board;
    // extract values from the solution
    let values = extractValues(solution, dim)
        .filter(item => parseInt(item[2]) !== 0);
    console.log(values);
    // dimensions of puzzle
    let dims = dim * dim;
    // values for if the puzzle should add a new starting value
    let start = [...Array(dim).keys()];
    // add starting value to board
    values.forEach(val => {
        if (start.includes(Math.round(Math.random() * dims))) {
            board[val[0] - 1][val[1] - 1].protected = true;
            board[val[0] - 1][val[1] - 1].value = val[2].toString();
        }
    });

    return board
}

export function newBoardInputNumber(solution, dim, num) {
    // create empty board
    let board = initialiseBoard(dim);
    // return if board dimension is 1
    if(dim === 1) return board;
    // extract values from the solution
    let values = extractValues(solution, dim)
        .filter(item => parseInt(item[2]) !== 0);
    console.log(values);
    // max value for random number
    let maxValue = values.length;
    // store the used solution numbers
    let usedValues = [];

    while(usedValues.length < num) {
        // get a random number between 0 and the length of the list
        let index = Math.floor(Math.random() * maxValue);
        // Extract the value from the solution
        let value = values[index];
        // Create number for storing in solution
        let val = createNum(value[0], value[1], value[2], dim);
        // If number hasn't been used
        if (!usedValues.includes(val)) {
            // push the number to solutions
            usedValues.push(val);
            // add number to board
            board[value[0] - 1][value[1] - 1].protected = true;
            board[value[0] - 1][value[1] - 1].value = value[2].toString();
        }
    }


    return board
}