import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/Hour.css';
import store from '../store';
import * as actions from '../actions/index';

class Hour extends Component {
    render() {
        return(
            <div className="hour">
                <p>{this.props.info.FCTTIME.pretty}</p>
                <p>{this.props.info.condition}</p>
                <p>{this.props.info.temp.english + " F"}</p>
                <p>{this.props.info.temp.metric + " C"}</p>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    forecast: state.user.whether.hourly_forecast,
    settings: state.user.settings
})

export default connect(mapStateToProps)(withRouter(Hour));