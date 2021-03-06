import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import store from '../store';
import * as actions from '../actions/index';
import '../styles/Settings.css';
import WeatherSettings from './settings/WeatherSettings';
import TimeSettings from './settings/TimeSettings';
import DateSettings from './settings/DateSettings';
import BackgroundSettings from './settings/BackgroundSettings';
import ForegroundSettings from './settings/ForegroundSettings';

class Settings extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.locationFieldChange = this.locationFieldChange.bind(this)
        this.getGeocode = this.getGeocode.bind(this);
        this.getWhether = this.getWhether.bind(this);
        this.enterLocation = this.enterLocation.bind(this);
        this.isValidLocation = this.isValidLocation.bind(this);
        this.saveSettingsButton = this.saveSettingsButton.bind(this)
        this.saveSettings = this.saveSettings.bind(this)
        
        this.state = {
            locationField: '',
            msg: ''
        }
    }

    componentDidMount() {
        if (this.props.settings.location.location && !this.props.user.whether) {
            this.getWhether(this.props.settings.location.location)
            if (!this.props.user.gettingWhether) {
                this.settingsMomentId = setInterval(() => {
                    console.log("whether updated")
                    this.getWhether(this.props.settings.location.location);
                }, 1800000)
                return store.dispatch(actions.gettingWhether(true))
            }
        }
    }


    saveSettings() {
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
                this.setState({ msg: 'Your settings have been saved'})
                setTimeout(() => {
                    this.setState({msg: ''})
                }, 3000)
                return store.dispatch(actions.saveSettings(user.settings))
            })
            .catch(error => console.log(error))
    }

    saveSettingsButton() {
        if (this.props.user.status === 'uncomfirmed') {
            return <p style={{ color: 'red' }}>Please confirm email and log back in to save your settings.</p>
        } else {
            return <div className="saveSettings">
                <button className="saved-settings-button" onClick={this.saveSettings} type='button'>Save Settings</button>
                <p className="saved-settings">{this.state.msg}</p>
                </div>
        }
    }

    isValidLocation(data) {
        if (data.results[0] === undefined) {
            return store.dispatch(actions.locationIsValid(false))
        } else {
            return store.dispatch(actions.locationIsValid(true))
        }
    }

    enterLocation() {
        if (!this.props.user.settings.location.location) {
            return <div>Please enter location to unlock settings</div>
        } else {
            return <div>Location set to: {this.props.settings.location.locationF}</div>
        }
    }

    getGeocode(location) {
        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.results[0] === undefined) {
                    this.isValidLocation(data);
                    return;
                } else {
                    this.isValidLocation(data);
                    this.getWhether(data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng);
                    // if (!this.props.user.gettingWhether) {
                        this.settingsMomentId = setInterval(() => {
                            console.log("fire!")
                            this.getWhether(this.props.settings.location);
                        }, 18000000)
                    // }
                    return store.dispatch(actions.locationUpdate(
                        data.results[0].geometry.location.lat + "," + data.results[0].geometry.location.lng,
                        data.results[0].formatted_address
                    ))
                }
            })
            .then(() => {
                return store.dispatch(actions.gettingWhether(true))
            })
            .then(error => console.log(error))
    }


    getWhether(location) {
        return fetch('https://api.wunderground.com/api/9a6893f45ddf840d/astronomy/conditions/forecast/forecast10day/hourly/hourly10day/rawtide/tide/webcams/yesterday/q/' + location + '.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                return store.dispatch(actions.whetherUpdate(data));
            })
            .catch(error => console.log(error));
    }

    locationFieldChange(e) {
        this.setState({ locationField: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault();
        clearInterval(this.settingsMomentId);
        const location = this.state.locationField;

        this.getGeocode(location);
    }

    render() {
        return (
            <div className="settings">
                {this.enterLocation()}
                <form className="submitlocation" onSubmit={this.onSubmit}>
                    <input id="enterlocation" type="text" name="location"
                        onChange={this.locationFieldChange} value={this.state.locationField} />
                        <button className="enter-location-button" type="submit" value="Submit">Change Location</button>
                    {!this.props.settings.validLocation ? <span>Please enter a valid location</span> : <span></span>}
                    {!this.props.settings.validLocation ? <br /> : null}
                </form>
                <div className="options-container">
                    <div className="left-side">
                        <WeatherSettings />
                    </div>
                    <div className="right-side">
                        <h3>Time & Date</h3>
                            <TimeSettings />
                            <DateSettings />
                        <div className="colorSettings">
                            <h3>Color & Themes</h3>
                            <div className="backgroundSettings">
                                <h4>Background</h4>
                                <BackgroundSettings />
                                <h4>Foreground</h4>
                                <ForegroundSettings />
                            </div>
                        </div>
                    </div>
                </div>
                {this.saveSettingsButton()}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    settings: state.user.settings
})

export default connect(mapStateToProps)(withRouter(Settings));