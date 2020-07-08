import * as SudokuLogic from "../../utils/sudoku/logic/SudokuLogic";
import expect from 'expect';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import {newBoard} from "../../utils/solver/logic/SolverLogic";

describe('Sudoku Logic', () => {
    it("Validate input under min value returns empty string", () => {
        const input = "-1";
        const dim = "1";

        const expectedValue = '';
        const actualValue = SudokuLogic.validateInput(input, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Validate input returns valid input", () => {
        const input = "1";
        const dim = "1";

        const expectedValue = "1";
        const actualValue = SudokuLogic.validateInput(input, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Validate input over max value returns empty string", () => {
        const input = "2";
        const dim = "1";

        const expectedValue = '';
        const actualValue = SudokuLogic.validateInput(input, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Validate input over max value double digits returns first digit", () => {
        const input = "17";
        const dim = "4";

        const expectedValue = "1";
        const actualValue = SudokuLogic.validateInput(input, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Initialize board should create an empty board with correct groups and size", () => {
        const dim = 2;

        const expectedValue = expectedBoard;
        const actualValue = SudokuLogic.initialiseBoard(dim);

        expect(actualValue).toEqual(expectedValue.board);
    });

    it("Calculate boxes gives expected values for each box", () => {
        const dim = 2;

        const expectedValues = [[0, 0, 1, 1], [0, 0, 1, 1], [2, 2, 3, 3], [2, 2, 3, 3]];

        for (let x = 0; x < dim * dim; x++) {
            for (let y = 0; y < dim * dim; y++) {
                const actualValue = SudokuLogic.calculateBox(x, y, dim);
                expect(actualValue).toEqual(expectedValues[x][y]);
            }
        }
    });

    it("Remove empty cells from row should remove all the empty cells", () => {
        const row = [{value: '', 'protected': false, group: 0}, {value: '1', 'protected': false, group: 0}];

        const expectedValue = [{value: '1', 'protected': false, group: 0}];
        const actualValue = SudokuLogic.removeEmptyCells(row);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check unique should return true when array is unique", () => {
        const row = [{value: '1', 'protected': false, group: 0}, {value: '2', 'protected': false, group: 0}];

        const expectedValue = true;
        const actualValue = SudokuLogic.checkIfUnique(row);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check unique should return false when array is not unique", () => {
        const row = [{value: '1', 'protected': false, group: 0}, {value: '1', 'protected': false, group: 0}];

        const expectedValue = false;
        const actualValue = SudokuLogic.checkIfUnique(row);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Get column should return the specified column of a 2d array", () => {
        const board = [
            [{value: '1', 'protected': false, group: 0}, {value: '2', 'protected': false, group: 0}],
            [{value: '3', 'protected': false, group: 0}, {value: '4', 'protected': false, group: 0}]
        ];

        const columnIndex = 0;

        const expectedValue = [{value: '1', 'protected': false, group: 0}, {value: '3', 'protected': false, group: 0}];
        const actualValue = SudokuLogic.getColumn(board, columnIndex);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Get group should return the specified group of a 2d array", () => {
        const board = [
            [{value: '1', 'protected': false, group: 0}, {value: '2', 'protected': false, group: 1}],
            [{value: '3', 'protected': false, group: 1}, {value: '4', 'protected': false, group: 0}]
        ];

        const groupIndex = 1;

        const expectedValue = [{value: '2', 'protected': false, group: 1}, {value: '3', 'protected': false, group: 1}];
        const actualValue = SudokuLogic.getGroupByIndex(board, groupIndex);

        expect(actualValue).toEqual(expectedValue);
    });


    it("Check should return true when passed an empty board", () => {
        const board = emptyBoard.board;

        board.map(row => row.filter(cell => cell.value !== ''));

        const expectedValue = true;

        const actualValue = SudokuLogic.check(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check should return true when passed a completed board", () => {
        const board = completedBoard.board;

        const expectedValue = true;

        const actualValue = SudokuLogic.check(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check should return true when passed a simi-completed correct board", () => {
        const board = semiCompletedBoard.board;

        const expectedValue = true;

        const actualValue = SudokuLogic.check(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check should return false when passed a column error", () => {
        const board = columnError.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.check(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check should return false when passed a row error", () => {
        const board = rowError.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.check(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check should return false when passed a box error", () => {
        const board = boxError.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.check(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check completed should return false when passed an empty board", () => {
        const board = emptyBoard.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.checkCompleted(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check completed should return true when passed a completed correct board", () => {
        const board = completedBoard.board;

        const expectedValue = true;

        const actualValue = SudokuLogic.checkCompleted(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check completed should return false when an uncompleted board", () => {
        const board = semiCompletedBoard.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.checkCompleted(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check completed should return false when passed a column error", () => {
        const board = columnError.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.checkCompleted(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check completed should return false when passed a row error", () => {
        const board = rowError.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.checkCompleted(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Check completed should return false when passed a box error", () => {
        const board = boxError.board;

        const expectedValue = false;

        const actualValue = SudokuLogic.checkCompleted(board);

        expect(actualValue).toEqual(expectedValue);
    });

    it("New board returns an empty board when the dimensions are 1", () => {
        const expectedValue = [[{value: '', 'protected': false, "solver": false, group: 0}]];

        let solution = "";
        let dim = 1;
        let num = 1;

        const actualValue = newBoard(solution, dim, num);

        expect(actualValue).toEqual(expectedValue);
    });

    it("New board returns a board with the number of inputs requested", () => {
        let solution = "v 111";
        let dim = 2;
        let num = 1;

        const board = newBoard(solution, dim, num);
        let count = 0;

        board.flat().forEach(value => {
            if(value.protected) count++;
        });

        expect(num).toEqual(count);
    });

    it("New board returns a board with the number of inputs requested of 5", () => {
        let solution = "v 111 122 133 144 214";
        let dim = 2;
        let num = 5;

        const board = newBoard(solution, dim, num);
        let count = 0;

        board.flat().forEach(value => {
            if(value.protected) count++;
        });

        expect(num).toEqual(count);
        expect(expectedBoardSolution.board).toEqual(board);
    });
});


const emptyBoard = {
    board: [
        [{value: '', 'protected': false, group: 0}, {value: '', 'protected': false, group: 1}],
        [{value: '', 'protected': false, group: 2}, {value: '', 'protected': false, group: 3}],
    ]
};

const completedBoard = {
    board: [
        [{value: '1', 'protected': false, group: 0}, {value: '2', 'protected': false, group: 1}],
        [{value: '3', 'protected': false, group: 2}, {value: '4', 'protected': false, group: 3}],
    ]
};

export const semiCompletedBoard = {
    board: [
        [{value: '1', 'protected': false, group: 0}, {value: '2', 'protected': false, group: 1}],
        [{value: '3', 'protected': false, group: 2}, {value: '', 'protected': false, group: 3}],
    ]
};

const columnError = {
    board: [
        [{value: '1', 'protected': false, group: 0}, {value: '2', 'protected': false, group: 1}],
        [{value: '1', 'protected': false, group: 2}, {value: '4', 'protected': false, group: 3}],
    ]
};

const rowError = {
    board: [
        [{value: '1', 'protected': false, group: 0}, {value: '1', 'protected': false, group: 1}],
        [{value: '3', 'protected': false, group: 2}, {value: '4', 'protected': false, group: 3}],
    ]
};

const boxError = {
    board: [
        [{value: '1', 'protected': false, group: 1}, {value: '2', 'protected': false, group: 2}],
        [{value: '3', 'protected': false, group: 3}, {value: '1', 'protected': false, group: 1}],
    ]
};

const expectedBoard = {
    board: [
        [
            {value: '', 'protected': false, group: 0, solver: false},
            {value: '', 'protected': false, group: 0, solver: false},
            {value: '', 'protected': false, group: 1, solver: false},
            {value: '', 'protected': false, group: 1, solver: false}
        ],
        [
            {value: '', 'protected': false, group: 0, solver: false},
            {value: '', 'protected': false, group: 0, solver: false},
            {value: '', 'protected': false, group: 1, solver: false},
            {value: '', 'protected': false, group: 1, solver: false}
        ],
        [
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 3, solver: false},
            {value: '', 'protected': false, group: 3, solver: false}
        ],
        [
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 3, solver: false},
            {value: '', 'protected': false, group: 3, solver: false}
        ]
    ]
};

const expectedBoardSolution = {
    board: [
        [
            {value: '1', 'protected': true, group: 0, solver: false},
            {value: '2', 'protected': true, group: 0, solver: false},
            {value: '3', 'protected': true, group: 1, solver: false},
            {value: '4', 'protected': true, group: 1, solver: false}
        ],
        [
            {value: '4', 'protected': true, group: 0, solver: false},
            {value: '', 'protected': false, group: 0, solver: false},
            {value: '', 'protected': false, group: 1, solver: false},
            {value: '', 'protected': false, group: 1, solver: false}
        ],
        [
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 3, solver: false},
            {value: '', 'protected': false, group: 3, solver: false}
        ],
        [
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 2, solver: false},
            {value: '', 'protected': false, group: 3, solver: false},
            {value: '', 'protected': false, group: 3, solver: false}
        ]
    ]
};