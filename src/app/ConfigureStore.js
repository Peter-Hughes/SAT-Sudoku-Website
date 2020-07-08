import {applyMiddleware, createStore} from "redux";
import {routerMiddleware} from "connected-react-router";
import {createBrowserHistory} from "history";
import thunk from "redux-thunk";
import Reducer from "./Reducers";
import {composeWithDevTools} from 'redux-devtools-extension';

// Create History - History stores if a component has been changed or updated
export const history = createBrowserHistory();

// Create store with all the reducers, any preloaded state and composed with Redux devtools and middleware (thunk)
export default preloadedState => createStore(
    Reducer(history),
    preloadedState,
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        ),
    )
)
