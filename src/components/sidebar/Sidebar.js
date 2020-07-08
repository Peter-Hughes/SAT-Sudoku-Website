import React, {Component} from 'react';
import {connect} from 'react-redux';


class Sidebar extends Component {

    render() {
        return this.props.sidebar.visible ? <div className="sidebar-container">
            {this.props.inputs}
        </div> : "";
    }
}

const mapStateToProps = state => {
    return state
};

export default connect(mapStateToProps)(Sidebar);