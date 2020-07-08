import * as SidebarActions from "../../components/sidebar/SidebarActions"
import expect from 'expect';
import {sidebarReducer} from "../../components/sidebar/SidebarReducer";
import InitialState from "../../components/common/InitialState";


describe('Sidebar Reducer', () => {
    it("should update visibility from false to true when passed UPDATE_VISIBILITY", () => {
        const initialState = {visible: false};

        const expectedVisibility = true;

        const action = {type: SidebarActions.UPDATE_VISIBILITY};
        const newState = sidebarReducer(initialState, action);

        expect(newState.visible).toEqual(expectedVisibility);
    });

    it("should update visibility from true to false when passed UPDATE_VISIBILITY", () => {
        const initialState = {visible: true};

        const expectedVisibility = false;

        const action = {type: SidebarActions.UPDATE_VISIBILITY};
        const newState = sidebarReducer(initialState, action);

        expect(newState.visible).toEqual(expectedVisibility);
    });

    it("Solvers to update correctly", () => {
        const initialState = InitialState.sidebar;

        const expectedResult = ["A", "B"];

        const action = {type: SidebarActions.GET_SOLVERS_SUCCESS, solvers: expectedResult};
        const newState = sidebarReducer(initialState, action);

        expect(newState.solvers).toEqual(expectedResult);
    });

    it("Solvers updates current solver", () => {
        const initialState = InitialState.sidebar;

        const expectedResult = "A";

        const action = {type: SidebarActions.GET_SOLVERS_SUCCESS, solvers: ["A", "B"], solver: "A"};
        const newState = sidebarReducer(initialState, action);

        expect(newState.solver).toEqual(expectedResult);
    });

    it("Solver to be changed correctly", () => {
        const initialState = InitialState.sidebar;

        const expectedResult = "A";

        const action = {type: SidebarActions.CHANGE_SOLVER, solver: expectedResult};
        const newState = sidebarReducer(initialState, action);

        expect(newState.solver).toEqual(expectedResult);
    });

    it("Number of inputs can be changed", () => {
        const initialState = InitialState.sidebar;

        const expectedResult = 3;

        const action = {type: SidebarActions.CHANGE_NUM_INPUT, num: expectedResult};
        const newState = sidebarReducer(initialState, action);

        expect(newState.numInputs).toEqual(expectedResult);
    });
});
