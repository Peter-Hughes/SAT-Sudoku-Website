import axios from "axios";

export const UPDATE_VISIBILITY = "UPDATE_VISIBILITY";
export const GET_SOLVERS_SUCCESS = "GET_SOLVERS_SUCCESS";
export const GET_SOLVERS_FAILURE = "GET_SOLVERS_FAILURE";
export const CHANGE_SOLVER = "CHANGE_SOLVER";
export const CHANGE_NUM_INPUT = "CHANGE_NUM_INPUT";

// Updates if the side bar should be shown or not
export function updateVisibility() {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: UPDATE_VISIBILITY}))
    });
}

export function getSolvers() {
    return dispatch => new Promise(resolve => {
        return axios.get("http://localhost:9000/api/availableSolvers")
            .then(response => {
                let solvers = response.data.slice(1, -1).split(", ").map(solver => {
                    return {value: solver, label: solver}
                });
                resolve(dispatch({type: GET_SOLVERS_SUCCESS, solvers: solvers, solver: solvers[0].value}))
            }).catch(err => {
                console.log(err);
                resolve(dispatch({type: GET_SOLVERS_FAILURE, solvers: []}))
            });
    })
}

export function changeSolver(solver) {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: CHANGE_SOLVER, solver: solver}))
    })
}

export function changeNumInput(num) {
    return dispatch => new Promise(resolve => {
        return resolve(dispatch({type: CHANGE_NUM_INPUT, num: num}))
    })
}
