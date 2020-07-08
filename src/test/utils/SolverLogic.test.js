import * as SolverLogic from "../../utils/solver/logic/SolverLogic";
import expect from 'expect';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';


describe('Solver Logic', () => {
    it("Can check if a solution is unsatisfiable", () => {
        const input = "s UNSATISFIABLE";

        const expectedValue = true;
        const actualValue = SolverLogic.isUnSat(input);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Can check if a empty solution is unsatisfiable", () => {
        const input = "";

        const expectedValue = true;
        const actualValue = SolverLogic.isUnSat(input);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Can check if a solution is satisfiable", () => {
        const input = "s SATISFIABLE";

        const expectedValue = false;
        const actualValue = SolverLogic.isUnSat(input);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Can check if a solution with SAT is satisfiable", () => {
        const input = "SAT";

        const expectedValue = false;
        const actualValue = SolverLogic.isUnSat(input);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Can extract only the results from the solution ", () => {
        const input = "s SATISFIABLE \nv 111 \nv -112 \nv 0";

        const expectedValue = [["1", "1", "1"]];
        const actualValue = SolverLogic.extractValues(input, 1);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Can extract only the results from the solution ", () => {
        const input = "s SATISFIABLE \nv 111 \nv -112 \nv 0";
        let oldBoard = [[{value: "0", protected: false, group: 0}]];

        const expectedValue = [[{value: "1", protected: false, group: 0}]];
        const actualValue = SolverLogic.createBoardFromSolution(input, 1, oldBoard);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Keeps the protected boxes", () => {
        const input = "s SATISFIABLE \nv 111 \nv -112 \nv 0";
        let expectedValue = [[{value: "1", protected: true, group: 0}]];

        const actualValue = SolverLogic.createBoardFromSolution(input, 1, expectedValue);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Correctly encodes 1x1 numbers", () => {
        const dim = 1;
        const row = 1;
        const col = 1;
        const val = 1;

        const expectedValue = "111";
        const actualValue = SolverLogic.createNum(row, col, val, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Correctly encodes 2x2 numbers", () => {
        const dim = 2;
        const row = 1;
        const col = 1;
        const val = 1;

        const expectedValue = "111";
        const actualValue = SolverLogic.createNum(row, col, val, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Correctly encodes 3x3 numbers", () => {
        const dim = 3;
        const row = 1;
        const col = 1;
        const val = 1;

        const expectedValue = "111";
        const actualValue = SolverLogic.createNum(row, col, val, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Correctly encodes 4x4 numbers", () => {
        const dim = 4;
        const row = 1;
        const col = 1;
        const val = 1;

        const expectedValue = "307";
        const actualValue = SolverLogic.createNum(row, col, val, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Correctly encodes 5x5 numbers", () => {
        const dim = 5;
        const row = 1;
        const col = 1;
        const val = 1;

        const expectedValue = "703";
        const actualValue = SolverLogic.createNum(row, col, val, dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Calculate row gives expected value", () => {
        const dim = 3;

        const expectedValue = 100;
        const actualValue = SolverLogic.calcRow(dim);

        expect(actualValue).toEqual(expectedValue);
    });

    it("Calculate column gives expected value", () => {
        const dim = 3;

        const expectedValue = 10;
        const actualValue = SolverLogic.calcCol(dim);

        expect(actualValue).toEqual(expectedValue);
    });
});