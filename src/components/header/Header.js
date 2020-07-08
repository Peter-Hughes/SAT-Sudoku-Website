import React from 'react';
import {connect} from 'react-redux';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {updateVisibility} from "../sidebar/SidebarActions";
import {NavLink} from "react-router-dom";

class Header extends React.Component {

    render() {
        return (
            <header>
                <div className={"sidebar"}>
                    <FontAwesomeIcon icon={faBars} onClick={() => this.props.updateVisibility()}/>
                </div>
                <div className={"logo"}>
                    <NavLink to="/"><img src="/image/logo.png" alt="Sudoku Logo"/></NavLink>
                </div>
                <div className={"nav"}>
                    <NavLink to="/" activeStyle={activeColour} exact={true}>Puzzle</NavLink>
                    <NavLink to="/cnf" activeStyle={activeColour}>CNF</NavLink>
                </div>
            </header>
        );
    }
}

const activeColour = {color: "#43a947"};

// Map the Sidebar state to props
const mapStateToProps = (state) => {
    return state.sidebar
};

// Map the actions to props
const mapDispatchToProps = {
    updateVisibility
};

// Connect the mapStateToProps and mapDispatchToProps and export the Header as default
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);