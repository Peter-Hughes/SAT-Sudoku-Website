import * as CnfActions from "../../components/cnf/CnfActions"
import expect from 'expect';
import {cnfReducer} from "../../components/cnf/CnfReducer";
import InitialState from "../../components/common/InitialState";


describe('Cnf Reducer', () => {
    it("should update solution when passed UPDATE_SOLUTION", () => {
        const initialState = {solution: "A"};

        const expectedSolution = "B";

        const action = {type: CnfActions.UPDATE_SOLUTION, solution: expectedSolution};
        const newState = cnfReducer(initialState, action);

        expect(newState.solution).toEqual(expectedSolution);
    });

    it("should update problem when passed UPDATE_PROBLEM", () => {
        const initialState = {problem: "A"};

        const expectedProblem = "B";

        const action = {type: CnfActions.UPDATE_PROBLEM, problem: expectedProblem};
        const newState = cnfReducer(initialState, action);

        expect(newState.problem).toEqual(expectedProblem);
    });

    it("should change isFull from false to true when passed UPDATE_CNF_BOOL", () => {
        const initialState = {isFull: false};

        const expected = true;

        const action = {type: CnfActions.UPDATE_CNF_BOOL};
        const newState = cnfReducer(initialState, action);

        expect(newState.isFull).toEqual(expected);
    });

    it("should change isFull from true to false when passed UPDATE_CNF_BOOL", () => {
        const initialState = {isFull: true};

        const expected = false;

        const action = {type: CnfActions.UPDATE_CNF_BOOL};
        const newState = cnfReducer(initialState, action);

        expect(newState.isFull).toEqual(expected);
    });

    it("should set status to pending when passed SOLVE_PENDING", () => {
        const initialState = {status: ""};

        const expected = "pending";

        const action = {type: CnfActions.SOLVE_PENDING};
        const newState = cnfReducer(initialState, action);

        expect(newState.status).toEqual(expected);
    });

    it("should update SOLVE_SUCCESS correctly", () => {
        const initialState = InitialState.cnf;
        const problem = "A";
        const solution = "B";
        const status = "resolved";

        const expected = {
            ...initialState,
            problem: problem,
            solution: solution,
            status: status
        };

        const action = {type: CnfActions.SOLVE_SUCCESS, problem: problem, solution: solution};
        const newState = cnfReducer(initialState, action);

        expect(newState).toEqual(expected);
    });

    it("should update SOLVE_FAILURE correctly", () => {
        const initialState = InitialState.cnf;
        const problem = "A";
        const message = "B";
        const status = "resolved";

        const expected = {
            ...initialState,
            problem: problem,
            status: status,
            message: message
        };

        const action = {type: CnfActions.SOLVE_FAILURE, problem: problem, message: message};
        const newState = cnfReducer(initialState, action);

        expect(newState).toEqual(expected);
    });
});
