import * as PuzzleActions from "../../components/puzzle/PuzzleActions"
import expect from 'expect';
import {puzzleReducer} from "../../components/puzzle/PuzzleReducer";
import InitialState from "../../components/common/InitialState";


describe('Puzzle Reducer', () => {
    it("should update board and dimensions when passed CREATE_BOARD", () => {
        const initialState = {board: [], dimension: 1, error: true};

        const newBoard = [{value: "A", protected: false}];
        const newDimensions = 2;

        const expectedState = {...InitialState.puzzle, board: newBoard, dimension: newDimensions};
        const action = {type: PuzzleActions.CREATE_BOARD, board: newBoard, dimension: newDimensions};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it("should update dimensions when passed CREATE_BOARD", () => {
        const initialState = {dimension: 1};

        const newDimensions = 2;

        const action = {type: PuzzleActions.CREATE_BOARD, dimension: newDimensions};
        const newState = puzzleReducer(initialState, action);

        expect(newState.dimension).toEqual(newDimensions);
    });

    it("should update a cell value when passed UPDATE_CELL", () => {
        const initialState = {board: [[{value: 0, protected: false}]]};

        const expectedBoard = {board: [[{value: 1, protected: false}]]};

        const x = 0;
        const y = 0;
        const value = 1;

        const action = {type: PuzzleActions.UPDATE_CELL, x: x, y: y, value: value};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedBoard);
    });

    it("should clear the board, except for protected values when passed CLEAR_BOARD", () => {
        const initialState = {
            board: [[{value: 0, protected: true, solver: true}, {
                value: 1,
                protected: false,
                solver: true
            }]]
        };

        const expectedBoard = {
            board: [[{value: 0, protected: true, solver: true}, {value: '', protected: false, solver: false}]],
            cnfMessage: "",
            message: "",
            error: false
        };

        const action = {type: PuzzleActions.CLEAR_BOARD};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedBoard);
    });

    it("should clear the board from solver values only", () => {
        const initialState = {
            board: [[{value: 1, protected: false, solver: true}, {
                value: 1,
                protected: false,
                solver: false
            }]]
        };

        const expectedBoard = {
            board: [[{value: '', protected: false, solver: false}, {value: 1, protected: false, solver: false}]],
            cnfMessage: "",
            message: "",
            error: false
        };

        const action = {type: PuzzleActions.CLEAR_BOARD_SOLVER};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedBoard);
    });

    it("CLEAR_BOARD_SOLVER shouldn't change protected values", () => {
        const initialState = {board: [[{value: 1, protected: true, solver: false}]]};

        const expectedBoard = {
            board: [[{value: 1, protected: true, solver: false}]],
            cnfMessage: "",
            message: "",
            error: false
        };

        const action = {type: PuzzleActions.CLEAR_BOARD_SOLVER};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedBoard);
    });

    it("should clear the board completely, including protected values when passed CLEAR_BOARD_PROTECTED", () => {
        const initialState = {
            board: [[{value: 0, protected: true, solver: false}, {
                value: 1,
                protected: false,
                solver: true
            }]]
        };

        const expectedBoard = {
            board: [[{value: '', protected: false, solver: false}, {value: '', protected: false, solver: false}]],
            cnfMessage: "",
            message: "",
            error: false
        };

        const action = {type: PuzzleActions.CLEAR_BOARD_PROTECTED};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedBoard);
    });

    it("should update selected cell with the correct row and column when passed SELECT_CELL", () => {
        const initialState = {row: -1, col: -1, board: [[{value: 0, protected: true}]]};

        const expectedCell = {row: 0, col: 0, protected: true};
        const x = 0;
        const y = 0;

        const action = {type: PuzzleActions.SELECT_CELL, x: x, y: y};
        const newState = puzzleReducer(initialState, action);

        expect(newState.selectedCell).toEqual(expectedCell);
    });

    it("should protect the cell selected cell when passed PROTECT_CELL", () => {
        const initialState = {
            selectedCell: {row: 0, col: 0, protected: false},
            board: [[{value: 0, protected: false}]]
        };

        const expectedState = {selectedCell: {row: 0, col: 0, protected: true}, board: [[{value: 0, protected: true}]]};

        const action = {type: PuzzleActions.PROTECT_CELL};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it("should unprotect the cell selected cell if the cell was previously protected when passed PROTECT_CELL", () => {
        const initialState = {selectedCell: {row: 0, col: 0, protected: true}, board: [[{value: 0, protected: true}]]};

        const expectedState = {
            selectedCell: {row: 0, col: 0, protected: false},
            board: [[{value: 0, protected: false}]]
        };

        const action = {type: PuzzleActions.PROTECT_CELL};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it("should update selected cell with the correct row and column when cell is protected with PROTECT_CELL", () => {
        const initialState = {selectedCell: {row: 0, col: 0, protected: true}, board: [[{value: 0, protected: true}]]};

        const expectedState = {
            selectedCell: {row: 0, col: 0, protected: false},
            board: [[{value: 0, protected: false}]]
        };

        const action = {type: PuzzleActions.PROTECT_CELL};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it("should update message when passed CHECK_BOARD", () => {
        const initialState = {message: "", error: false};

        const expectedState = {message: "A", error: false};

        const message = "A";

        const action = {type: PuzzleActions.CHECK_BOARD, message: message, error: false};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it("should update error when passed CHECK_BOARD", () => {
        const initialState = {message: "", error: false};

        const expectedState = {message: "", error: true};

        const error = true;

        const action = {type: PuzzleActions.CHECK_BOARD, message: "", error: error};
        const newState = puzzleReducer(initialState, action);

        expect(newState).toEqual(expectedState);
    });

    it("should update cnfMessage when passed INTERPRET_FAILURE", () => {
        const initialState = {cnfMessage: "", cnfError: false};

        const expectedMessage = "A";
        const expectedError = true;

        const action = {type: PuzzleActions.INTERPRET_FAILURE, message: expectedMessage};
        const newState = puzzleReducer(initialState, action);

        expect(newState.cnfMessage).toEqual(expectedMessage);
        expect(newState.cnfError).toEqual(expectedError);

    });

    it("should update state correctly when passed INTERPRET_SUCCESS", () => {
        const initialState = {cnfMessage: "", board: [], dimension: 1, cnfError: true};

        const expectedMessage = "A";
        const expectedBoard = [[{value: ""}]];
        const expectedDim = 1;
        const expectedError = false;

        const action = {
            type: PuzzleActions.INTERPRET_SUCCESS,
            message: expectedMessage,
            board: expectedBoard
        };
        const newState = puzzleReducer(initialState, action);

        expect(newState.cnfMessage).toEqual(expectedMessage);
        expect(newState.board).toEqual(expectedBoard);
        expect(newState.dimension).toEqual(expectedDim);
        expect(newState.cnfError).toEqual(expectedError);
    });

    it("expect status to be set to pending when passed NEW_PENDING", () => {
        const initialState = {status: ""};

        const newState = puzzleReducer(initialState, {type: PuzzleActions.NEW_PENDING});

        expect(newState.status).toEqual("pending");
    });

    it("expect status to be set to resolved when passed NEW_FAILURE", () => {
        const initialState = {status: ""};

        const newState = puzzleReducer(initialState, {type: PuzzleActions.NEW_FAILURE});

        expect(newState.status).toEqual("resolved");
    });

    it("expect status to be set to resolved and update board/dim when passed NEW_SUCCESS", () => {
        const initialState = {status: "", board: [], dimension: 1};
        const expectedDim = 2;
        const expectedBoard = [{value: "1"}];

        const newState = puzzleReducer(initialState, {
            type: PuzzleActions.NEW_SUCCESS,
            dim: expectedDim,
            board: expectedBoard
        });

        expect(newState.status).toEqual("resolved");
        expect(newState.dimension).toEqual(expectedDim);
        expect(newState.board).toEqual(expectedBoard);
    });
});
