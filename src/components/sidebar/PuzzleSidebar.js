import React, {Component} from 'react';
import {connect} from 'react-redux';
import Select from "react-dropdown-select";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faLock, faTrash, faTrashAlt, faUnlock} from "@fortawesome/free-solid-svg-icons";
import {clearBoardProtected, clearBoardSolver, createBoard, protectCell} from "../puzzle/PuzzleActions";
import {changeNumInput, changeSolver, getSolvers} from "./SidebarActions";
import {solve} from "../cnf/CnfActions";
import {faSpinner} from "@fortawesome/free-solid-svg-icons/faSpinner";

class PuzzleSidebar extends Component {
    componentDidMount() {
        if (this.props.sidebar.solvers.length === 0) this.props.getSolvers();
    }

    componentDidUpdate(prevProps) {
        if (this.props.sidebar.numInputs > Math.pow(this.props.puzzle.dimension, 4)) this.props.changeNumInput(-1);
    }

    render() {
        return (
            <div className={"inputs"}>
                {/* Clear entire board button */}
                <button className={"button"} onClick={() => this.props.clearBoardProtected()}>
                    <FontAwesomeIcon icon={faTrashAlt}/> Clear All
                </button>
                <button className={"button"} onClick={() => this.props.clearBoardSolver()}>
                    <FontAwesomeIcon icon={faTrash}/> Clear Solver
                </button>
                {/* Protect current selected cell button */}
                <button className={"button"} onClick={() => this.props.protectCell()}>
                    <FontAwesomeIcon icon={this.props.puzzle.selectedCell.protected ? faUnlock : faLock}/> Protect Cell
                </button>
                {/* Drop down list to change board dimensions */}
                <div className={"dropdown"}>
                    <Select options={options}
                            className={"list"}
                            onChange={e => this.props.createBoard(e[0].value)}
                            placeholder={"Dimensions"}
                    />
                </div>
                {/* Drop down list to solver being used */}
                <div className={"dropdown"}>
                    <Select options={this.props.sidebar.solvers}
                            className={"list"}
                            onChange={e => this.props.changeSolver(e[0].value)}
                            placeholder={"Solvers"}
                    />
                </div>
                <button className={"button"} onClick={() =>
                    this.props.solve(this.props.puzzle.board, this.props.sidebar.solver, this.props.puzzle.dimension)
                }>
                    {getIcon(this.props.cnf.status)} Solve
                </button>
                <div className={"dropdown"}>
                    <Select options={getOptions(this.props.puzzle.dimension)}
                            values={getValue(this.props.sidebar.numInputs)}
                            className={"placeholder"}
                            onChange={e => this.props.changeNumInput(e[0].value)}
                    />
                </div>
            </div>
        )
    }
}

const getIcon = status => {
    return status === "pending" ? <FontAwesomeIcon icon={faSpinner} spin/> :
        <FontAwesomeIcon icon={faCheck}/>
};

const getOptions = dim => {
    const maxSize = Math.pow(dim, 4);

    return [...Array(maxSize).keys()].map(val => {
        return {value: val + 1, label: val + 1}
    })
};

const getValue = num => {
  return num > 0 ? [{value: num, label: num}] : [{value: num, label: "Number of Inputs"}]
};

// Options for the dimension drop down list
const options = [
    {value: 1, label: '1 x 1'},
    {value: 2, label: '2 x 2'},
    {value: 3, label: '3 x 3'},
    {value: 4, label: '4 x 4'},
    {value: 5, label: '5 x 5'}
];

// Map the full state to props
const mapStateToProps = state => {
    return state
};

// Map the actions to props
const mapDispatchToProps = {
    clearBoardProtected,
    protectCell,
    createBoard,
    getSolvers,
    changeSolver,
    solve,
    clearBoardSolver,
    changeNumInput
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PuzzleSidebar);