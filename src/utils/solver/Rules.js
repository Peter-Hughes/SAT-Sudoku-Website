import {calculateBox} from "../sudoku/logic/SudokuLogic";
import {createNum} from "./logic/SolverLogic";

export class Rules {
    constructor(dims) {
        this.cells = "";
        // Create a 2d empty array of the size of the dimensions
        this.boxes = Array(dims).fill(0).map(_ => Array(dims).fill(""));
        this.rows = "";
        this.columns = "";
        this.inputs = "";
        this.dims = dims;
    }

    // Add the cell rules for a given row, column, dimension and dimensions
    addCells = (row, col, dim, dims, isFull) => {
        let rules = isFull ? fullCnf(row, col, dim, dims) : "";
        // For the first value up to 1 less than the dimensions
        for (let v1 = 1; v1 <= (dims - 1); v1++) {
            // For the second values which is 1 plus the first value
            for (let v2 = v1 + 1; v2 <= dims; v2++) {
                // Add cell rules
                rules += `-${createNum(row, col, v1, dim)} -${createNum(row, col, v2, dim)} 0\n`
            }
        }
        this.cells += rules;
    };
    // Adds the boxes for a given row, column, dimension and dimensions
    addBoxes = (row, col, dim, dims) => {
        // Calculate which box the row and column belong to
        let x = calculateBox(row - 1, col - 1, dim);
        // Store rule into 2d array using the x variable and the val
        for (let val = 1; val <= dims; val++) this.boxes[x][val - 1] += `${createNum(row, col, val, dim)} `;
    };
    // Adds an entire row for a given row, value, dimension and dimensions
    addRows = (row, val, dim, dims, isFull) => {
        let rules = "";
        // For each column, create the rule for a given row and value
        for (let col = 1; col <= dims; col++) rules += `${createNum(row, col, val, dim)} `;
        this.rows += isFull ? rules + "0\n" + createVariables(dims, rules) : rules + "0\n";
    };
    // Adds an entire column for a given column, value, dimension and dimensions
    addColumns = (col, val, dim, dims, isFull) => {
        let rules = "";
        // For each row, create the rule for a given column and value
        for (let row = 1; row <= dims; row++) rules += `${createNum(row, col, val, dim)} `;
        this.columns += isFull ? rules + "0\n" + createVariables(dims, rules) : rules + "0\n";
    };
    // Add the first line for a given dimension and rules
    firstLine = (dims, rules) => {
        // Create the max variable that is in the rules
        let max = createNum(dims, dims, dims, Math.sqrt(dims));
        // Count the number of clauses in the puzzle
        let numClauses = rules.slice(0, -1).split(/\r\n|\r|\n/).length;
        // Returns first line of the rules
        return `p cnf ${max} ${numClauses} \n`
    };
    // Add user inputs from board
    addInputs = (board, dim) => board.forEach((row, x) => {
        row.forEach((cell, y) => {
            this.inputs += cell.value !== '' ? `${createNum(x + 1, y + 1, cell.value, dim)} 0\n` : '';
        })
    });
    // Returns the problem of the Sudoku puzzle
    problem = (isFull) => {
        // Convert 2d array into string
        let boxes = this.boxes.map(row => row.join("0\n")).join("0\n") + "0\n";
        boxes = isFull ? fullCnfBoxes(boxes, this.dims) : boxes;
        // Create the cnf problem
        let rules = this.cells + boxes + this.rows + this.columns;
        // Return the cells, boxes, rows and columns as a string
        return this.firstLine(this.dims, rules + this.inputs) + rules + this.inputs;
    };
}

const fullCnfBoxes = (boxes, dims) => {
    return boxes.split("0\n")
        .slice(0, -1)
        .map(box => box + "0\n" + createVariables(dims, box))
        .join("");
};

const fullCnf = (row, col, dim, dims) => {
    let rules = "";

    for (let i = 1; i <= dims; i++) rules += `${createNum(row, col, i, dim)} `;

    return rules + "0\n"
};

const createVariables = (dims, sequence) => {
    let variables = sequence.slice(0, -1).split(" ");
    let result = "";

    for (let v1 = 0; v1 < (dims - 1); v1++) {
        for (let v2 = v1 + 1; v2 < dims; v2++) {
            result += `-${variables[v1]} -${variables[v2]} 0\n`
        }
    }

    return result;
};