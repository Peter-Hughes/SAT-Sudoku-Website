import React from 'react';
import {connect} from 'react-redux';
import {updateSolution} from "./CnfActions";
import Sidebar from "../sidebar/Sidebar";
import CnfSidebar from "../sidebar/CnfSidebar";
import TextArea from "../common/TextArea";
import FileIO from "./components/FileIO";
import {createBoard} from "../puzzle/PuzzleActions";

class CnfPage extends React.Component {
    // Function that runs on the page load
    componentDidMount() {
        // Create the board if no board currently exists
        if (this.props.puzzle.board.length === 0) this.props.createBoard(this.props.puzzle.dimension);
    }

    render() {
        return (
            <div className={"container"}>
                <Sidebar inputs={<CnfSidebar/>}/>
                <div className={"cnf"}>
                    <FileIO downloadText={this.props.cnf.solution} onChange={this.props.updateSolution}/>
                    <div className={"editor"}>
                        <TextArea title={"Problem"} value={this.props.cnf.problem} readOnly={true}/>
                        <TextArea title={"Solution"} value={this.props.cnf.solution} readOnly={false}
                                  onChange={this.props.updateSolution}/>
                    </div>
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
    updateSolution,
    createBoard
};

// Connect the mapStateToProps and mapDispatchToProps and export the CnfPage as default
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CnfPage);