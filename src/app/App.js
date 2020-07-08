import React from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router'
import ConfigureStore, {history} from "./ConfigureStore";
import {Route, Switch} from "react-router";
import PuzzlePage from "../components/puzzle/PuzzlePage";
import Header from "../components/header/Header";
import CnfPage from "../components/cnf/CnfPage";
import ReduxToastr from 'react-redux-toastr'

// Create store - Store allows components to dispatch actions and subscribe to data updates from the store
const store = ConfigureStore();

// Apply store to provider and create routes
//  - Provider makes the Redux store available to any nested components
const App = () => (
    <Provider store={store}>
        {/* Creating the routes for the website and passing the react pages to each route */}
        <ConnectedRouter history={history}>
            <Header/>
            <Switch>
                <Route exact path="/" component={PuzzlePage}/>
                <Route exact path="/cnf" component={CnfPage}/>
            </Switch>
        </ConnectedRouter>
        {/* Add a Redux toast for use throughout the website */}
        <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-center"
            getState={(state) => state.toastr}
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick/>
    </Provider>
);

export default App;