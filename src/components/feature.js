import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import * as actions from '../actions'

class feature extends React.Component {
    componentWillMount(){
        this.props.fetchMessage()
    }

    render() {
        return(
            <div>
                feature
                <strong>{this.props.message}</strong>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {message: state.auth.message}
}

export default connect(mapStateToProps, actions)(feature);
