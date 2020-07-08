import expect from 'expect';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import {Rules} from "../../utils/solver/Rules";


describe('Rules Tests', () => {
    const dim = 2;
    const dims = 4;
    const row = 1;
    const column = 1;
    const value = 1;

    it("Expect cells to build up correctly for a given row and column for a 2x2 board", () => {
        const expectedValue = "-111 -112 0\n-111 -113 0\n-111 -114 0\n-112 -113 0\n-112 -114 0\n-113 -114 0\n";
        const rules = new Rules(dims);

        rules.addCells(row, column, dim, dims, false);
        const actualValue = rules.cells.toString();

        expect(actualValue).toEqual(expectedValue);
    });

    it("Expect cells to build up correctly for full cnf given a row and column for a 2x2 board", () => {
        const expectedValue = "111 112 113 114 0\n-111 -112 0\n-111 -113 0\n-111 -114 0\n-112 -113 0\n-112 -114 0\n" +
            "-113 -114 0\n";
        const rules = new Rules(dims);

        rules.addCells(row, column, dim, dims, true);
        const actualValue = rules.cells.toString();

        expect(actualValue).toEqual(expectedValue);
    });

    it("Expect row to build up correctly for a given row and value for a 2x2 board", () => {
        const expectedValue = "111 121 131 141 0\n";
        const rules = new Rules(dims);

        rules.addRows(row, value, dim, dims, false);
        const actualValue = rules.rows.toString();

        expect(actualValue).toEqual(expectedValue);
    });

    it("Expect row to build up correctly for full cnf given a row and value for a 2x2 board", () => {
        const expectedValue = "111 121 131 141 0\n-111 -121 0\n-111 -131 0\n-111 -141 0\n-121 -131 0\n-121 -141 0\n" +
            "-131 -141 0\n";
        const rules = new Rules(dims);

        rules.addRows(row, value, dim, dims, true);
        const actualValue = rules.rows.toString();

        expect(actualValue).toEqual(expectedValue);
    });


    it("Expect column to build up correctly for a given column and value for a 2x2 board", () => {
        const expectedValue = "111 211 311 411 0\n";
        const rules = new Rules(dims);

        rules.addColumns(column, value, dim, dims, false);
        const actualValue = rules.columns.toString();

        expect(actualValue).toEqual(expectedValue);
    });

    it("Expect column to build up correctly for full cnf given a column and value for a 2x2 board", () => {
        const expectedValue = "111 211 311 411 0\n-111 -211 0\n-111 -311 0\n-111 -411 0\n-211 -311 0\n-211 -411 0\n" +
            "-311 -411 0\n";
        const rules = new Rules(dims);

        rules.addColumns(column, value, dim, dims, true);
        const actualValue = rules.columns.toString();

        expect(actualValue).toEqual(expectedValue);
    });
});