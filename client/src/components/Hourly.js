import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/Hourly.css';
import Hour from './Hour';
// import store from '../store';
// import * as actions from '../actions/index';

class Hourly extends Component {
    render() {
        if (!this.props.forecast) {
            return (
                <div>
                    <p>Please <Link to="/settings">enter location</Link> for your hourly forecast.</p>
                </div>
            )
        } else {
            const hour = this.props.forecast.map((item, key) => {
                while (key < 24) {
                    return (<Hour info={item} key={key} />)
                }
            })
            return (
                <div className="hour-container">
                    {hour}
                </div>
            )
        }
    }
}

const mapStateToProps = (state, props) => ({
    forecast: state.user.whether.hourly_forecast,
    settings: state.user.settings
})

export default connect(mapStateToProps)(withRouter(Hourly));