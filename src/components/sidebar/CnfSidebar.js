import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle, faLightbulb, faProjectDiagram, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {interpretModel} from "../puzzle/PuzzleActions";
import {toastr} from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import {updateCnfBool, updateProblem} from "../cnf/CnfActions";

class CnfSidebar extends Component {
    render() {
        return (
            <div className={"inputs"}>
                <button className={"button"} onClick={this.props.updateCnfBool}>
                    <FontAwesomeIcon icon={cnfIcon(this.props.cnf.isFull)}/> Full CNF
                </button>
                <button className={"button"}
                        onClick={() => this.props.updateProblem(this.props.puzzle.board, this.props.puzzle.dimension,
                            this.props.cnf.isFull)}>
                    <FontAwesomeIcon icon={faProjectDiagram}/> Update Problem
                </button>
                <button className={"button"} onClick={() =>
                    this.props.interpretModel(this.props.cnf.solution, this.props.puzzle.dimension,
                        this.props.puzzle.board).then(() =>
                        toastMessage(this.props.puzzle.cnfError, this.props.puzzle.cnfMessage, 'Interpret Model')
                    )}>
                    <FontAwesomeIcon icon={faLightbulb}/> Interpret Solution
                </button>
            </div>
        )
    }
}

const cnfIcon = isFull => isFull ? faCheckCircle : faTimesCircle;

export const toastMessage = (isError, message, title) => isError ? toastr.info(title, message)
    : toastr.success(title, message);

const mapStateToProps = state => {
    return state
};

// Map the actions to props
const mapDispatchToProps = {
    interpretModel,
    updateProblem,
    updateCnfBool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CnfSidebar);