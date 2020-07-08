import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkPuzzle, clearBoard, createBoard, newPuzzle, updateCell, updateSelectedCell} from "./PuzzleActions";
import Buttons from "./components/Buttons";
import Sidebar from "../sidebar/Sidebar";
import PuzzleSidebar from "../sidebar/PuzzleSidebar";
import Board from "./components/Board";
import {hint} from "../cnf/CnfActions";

class PuzzlePage extends Component {
    // Function that runs on the page load
    componentDidMount() {
        // Create the board if no board currently exists
        if (this.props.puzzle.board.length === 0) this.props.createBoard(this.props.puzzle.dimension);
    }

    render() {
        return (
            <div className={"container"}>
                {/* Sidebar for the puzzle page */}
                <Sidebar inputs={<PuzzleSidebar/>}/>
                {/* Sudoku board and key buttons */}
                <div className={"puzzle"}>
                    <div className={this.props.puzzle.error ? "message-error" : "message"}>
                        {this.props.puzzle.message}
                    </div>
                    <Board board={this.props.puzzle.board}
                           updateSelectedCell={this.props.updateSelectedCell}
                           updateCell={this.props.updateCell}
                           dimension={this.props.puzzle.dimension}
                    />
                    <Buttons board={this.props.puzzle.board}
                             dim={this.props.puzzle.dimension}
                             solver={this.props.cnf.solver}
                             clearBoard={this.props.clearBoard}
                             check={this.props.checkPuzzle}
                             hint={this.props.hint}
                             newPuzzle={this.props.newPuzzle}
                             status={this.props.puzzle.status}
                             numInputs={this.props.sidebar.numInputs}
                    />
                    <div className={"message"}>{this.props.puzzle.cnfMessage}</div>
                </div>
            </div>
        );
    }
}

// Map the full state to props
const mapStateToProps = state => {
    return state
};

// Map the actions to props
const mapDispatchToProps = {
    createBoard,
    updateCell,
    updateSelectedCell,
    clearBoard,
    checkPuzzle,
    hint,
    newPuzzle
};

// Connect the mapStateToProps and mapDispatchToProps and export the Puzzle Page as default
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PuzzlePage);