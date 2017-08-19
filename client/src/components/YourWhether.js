import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../styles/YourWhether.css';
import store from '../store';
import * as actions from '../actions/index';
import Time from './Time';
import Date from './Date';
import Temperature from './Temperature';
import Visual from './Visual';
import Location from './Location';
import Description from './Description';
import Webcam from './Webcam';

class YourWhether extends Component {
    constructor(props) {
        super(props)

        this.displayWhether = this.displayWhether.bind(this);
        this.displayHighest = this.displayHighest.bind(this);
        this.displayLowest = this.displayLowest.bind(this);
        this.displayWind = this.displayWind.bind(this);
        this.getWhetherHome = this.getWhetherHome.bind(this);
        this.savePositionsButton = this.savePositionsButton.bind(this);
        this.savePositions = this.savePositions.bind(this)
        this.displaySaved = this.displaySaved.bind(this)

        this.state = {
            msg: ''
        }
    }

    componentDidMount() {
        if (!this.props.user.gettingWhether && this.props.observation) {
            this.getWhetherHome(this.props.settings.location.location)
            this.homeMomentId = setInterval(() => {
                store.dispatch(actions.gettingWhether(true))
                this.getWhetherHome(this.props.settings.location.location);
            }, 1800000)
            return;
        } else {
            return;
        }
    }

    getWhetherHome(location) {
        return fetch('https://api.wunderground.com/api/9a6893f45ddf840d/alerts/almanac/astronomy/conditions/currenthurricane/forecast/forecast10day/hourly/hourly10day/rawtide/tide/webcams/yesterday/q/' + location + '.json')
            .then(response => response.json())
            .then(data => {
                return store.dispatch(actions.whetherUpdate(data));
            })
            .catch(error => console.log(error));
    }

    displayWind() {
        if (this.props.settings.wind.isInputChecked === true) {
            return <div className="wind">Wind: {this.props.observation.wind_dir + " at " + this.props.observation.wind_mph + "mph"}</div>
        } else {
            return null;
        }
    }

    displayHighest() {
        if (this.props.settings.highest.isInputChecked) {
            return <div className="highest">Record High: {this.props.almanac.temp_high.record.F + " F (" + this.props.almanac.temp_high.record.C + " C)"}</div>
        } else {
            return null;
        }
    }

    displayLowest() {
        if (this.props.settings.lowest.isInputChecked) {
            return <div className="lowest">Record Low: {this.props.almanac.temp_low.record.F + " F (" + this.props.almanac.temp_low.record.C + " C)"}</div>
        } else {
            return null;
        }
    }

    displayWhether() {
        if (!this.props.observation) {
            // if (this.props.settings.location.isInputChecked || this.props.settings.weather.isInputChecked || this.props.settings.temperature.isInputChecked || this.props.settings.visual.isInputChecked || this.props.settings.webcam.isInputChecked) {
                return <div className="no-location">You don't appear to have a location yet.</div>
            // }
        } else {
            return null;
        }
    }

    savePositions() {
        return fetch('/api/saveSettings', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.user.email,
                settings: this.props.settings
            })
        })
            .then(response => response.json())
            .then(user => {
                console.log('saved')
                this.setState({ msg: 'Positions Saved'})
                return store.dispatch(actions.saveSettings(user.settings))
            })
            .catch(error => console.log(error))
    }

    savePositionsButton() {
        if (this.props.user.status === 'uncomfirmed') {
            return <p style={{ color: 'red' }}>Please confirm email and log back in to save your settings.</p>
        } else {
            return <button className="save-positions" onClick={this.savePositions} type='button'>Save Positions</button>
        }
    }

    displaySaved() {
        if (this.state.msg) {
            return <div className="saved">{this.state.msg}</div>
        } else {
            return <div></div>
        }
    }

    render() {
        return (
            <div className="yourWhether-container">
                <div className="yourWhether" style={{ backgroundColor: this.props.settings.background.color }}>
                    {this.displayWhether()}
                    {this.displaySaved()}
                    <Time />
                    <Date />
                    <Visual />
                    <Location />
                    <Description />
                    <Webcam />
                    <Temperature />
                </div>
                {this.savePositionsButton()}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    observation: state.user.whether.current_observation,
    almanac: state.user.whether.almanac,
    settings: state.user.settings,
    user: state.user
})

export default connect(mapStateToProps)(withRouter(YourWhether));