// The initial state that the website starts with
export default {
    puzzle: {
        // Dimensions of the Sudoku board
        dimension: 3,
        // The currently selected cell
        selectedCell: {
            row: 0,
            col: 0,
            protected: false
        },
        // Progress of Sudoku puzzle message
        message: "",
        // If there are any errors so far in the sudoku puzzle
        error: false,
        // The board for the sudoku puzzle
        board: [],
        // Message for when a solution is interpreted
        cnfMessage: "",
        // Boolean for if an error occurred when solution is interpreted
        cnfError: false,
        // Status of call for creating new puzzle
        status: "",
        // The number of inputs for a new puzzle
        numInputs: -1
    },
    sidebar: {
        // Boolean for if the sidebar should be shown or not
        visible: false,
        // List of all available solvers
        solvers: [],
        // The currently selected solver
        solver: ""
    },
    cnf: {
        // The problem model
        problem: "",
        // The CNF solution
        solution: "",
        // Message of if the solver was successful or not
        message: "",
        // Status of call for solve
        status: "",
        // Boolean to use full or simple cnf for the problem model
        isFull: true
    }
}