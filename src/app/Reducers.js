import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'
import {puzzleReducer} from "../components/puzzle/PuzzleReducer";
import {sidebarReducer} from "../components/sidebar/SidebarReducer";
import {cnfReducer} from "../components/cnf/CnfReducer";
import {reducer as toastrReducer} from 'react-redux-toastr';

// Combine reducers within the project to a single reducer and connect the routers together with the passed history
const Reducer = history => combineReducers({
    router: connectRouter(history),
    toastr: toastrReducer,
    cnf: cnfReducer,
    puzzle: puzzleReducer,
    sidebar: sidebarReducer
});
// Export Reducer as default
export default Reducer;