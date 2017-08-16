import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import store from '../store';
import * as actions from '../actions/index';
import './Settings.css';

const styles = {
    icon: {
        color: 'lightblue',
        width: '10%',
        effect: 'solid'
    },
    block: {
        width: '50%',
        margin: '10px'
    },
    toggle: {
        marginBottom: '8px',
        width: '100%',
        display: 'inline-block'
    },
    toggleSub: {
        width: '90%',
        display: 'inline-block',
        paddingLeft: '20px',
        fontSize: '15px'
    },
    thumbOff: {
        backgroundColor: '#ffcccc',
    },
    trackOff: {
        backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
        backgroundColor: 'red',
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d',
    },
    labelStyle: {
        color: 'black',
        width: '50%'
    },
    backgroundButton: {
        marginBottom: '2px',
        width: '50%'
    },
    backgroundLabel: {
        color: 'black'
    },
    backgroundIcon: {
        color: 'black',
        fill: 'black'
    }
};

class Settings extends Component {
    constructor(props) {
        super(props)

        this.onSubmit = this.onSubmit.bind(this);
        this.locationFieldChange = this.locationFieldChange.bind(this)
        this.getGeocode = this.getGeocode.bind(this);
        this.getWhether = this.getWhether.bind(this);
        this.enterLocation = this.enterLocation.bind(this);
        this.isValidLocation = this.isValidLocation.bind(this);
        this.toggleDescription = this.toggleDescription.bind(this);
        this.toggleLocation = this.toggleLocation.bind(this);
        this.toggleTemperature = this.toggleTemperature.bind(this);
        this.toggleFahrenheit = this.toggleFahrenheit.bind(this);
        this.toggleCelsius = this.toggleCelsius.bind(this);
        this.toggleVisual = this.toggleVisual.bind(this);
        this.toggleWebcam = this.toggleWebcam.bind(this);
        this.toggleTime = this.toggleTime.bind(this);
        this.toggleDate = this.toggleDate.bind(this);
        this.toggleSeconds = this.toggleSeconds.bind(this);
        this.toggleTwelve = this.toggleTwelve.bind(this);
        this.toggleMeridiem = this.toggleMeridiem.bind(this);
        this.toggleNumerical = this.toggleNumerical.bind(this);
        this.backgroundHandler = this.backgroundHandler.bind(this);
        this.foregroundHandler = this.foregroundHandler.bind(this);
        this.toggleApplyVisual = this.toggleApplyVisual.bind(this);
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

    foregroundHandler(e, value) {
        return store.dispatch(actions.foregroundChoice(value))
    }

    backgroundHandler(e, value) {
        return store.dispatch(actions.backgroundChoice(value))
    }

    toggleApplyVisual(e, applyVisual) {
        return store.dispatch(actions.applyVisual(applyVisual))
    }

    toggleNumerical(e, isInputChecked) {
        if (!isInputChecked) {
            return store.dispatch(actions.showNumerical(isInputChecked, 'MMMM Do, ', 'YYYY'))
        } else {
            return store.dispatch(actions.showNumerical(isInputChecked, 'M/D/', 'YYYY'))
        }
    }

    toggleMeridiem(e, isInputChecked) {
        if (!isInputChecked) {
            return store.dispatch(actions.showMeridiem(isInputChecked, ''))
        } else {
            return store.dispatch(actions.showMeridiem(isInputChecked, ' A'))
        }
    }

    toggleTwelve(e, isInputChecked) {
        if (!isInputChecked) {
            this.toggleMeridiem(e, isInputChecked)
            return store.dispatch(actions.showTwelve(isInputChecked, 'HH'))
        } else {
            return store.dispatch(actions.showTwelve(isInputChecked, 'h:'))
        }
    }

    toggleSeconds(e, isInputChecked) {
        if (!isInputChecked) {
            return store.dispatch(actions.showSeconds(isInputChecked, ''))
        } else {
            return store.dispatch(actions.showSeconds(isInputChecked, ':ss'))
        }
    }

    toggleDate(e, isInputChecked) {
        return store.dispatch(actions.showDate(isInputChecked))
    }

    toggleTime(e, isInputChecked) {
        return store.dispatch(actions.showTime(isInputChecked))
    }

    toggleWebcam(e, isInputChecked) {
        const ObjOrBool = this.props.settings.webcam.cam !== false ? this.props.settings.webcam.cam : false;
        if (!isInputChecked) {
            return store.dispatch(actions.showWebcam(isInputChecked, ObjOrBool))
        } else {
            return store.dispatch(actions.showWebcam(isInputChecked, ObjOrBool))
        }
    }

    toggleVisual(e, isInputChecked) {
        return store.dispatch(actions.showVisual(isInputChecked))
    }

    toggleLocation(e, isInputChecked) {
        return store.dispatch(actions.showLocation(isInputChecked))
    }

    toggleDescription(e, isInputChecked) {
        return store.dispatch(actions.showDescription(isInputChecked))
    }

    toggleTemperature(e, isInputChecked) {
        return store.dispatch(actions.showTemperature(isInputChecked))
    }

    toggleCelsius(e, isInputChecked) {
        if (!isInputChecked) {
            this.props.settings.temperature.celsiusFirst.isInputChecked = isInputChecked;
            if (!this.props.settings.temperature.fahrenheit.isInputChecked) {
                this.props.settings.temperature.fahrenheit.isInputChecked = !isInputChecked;
            }
        }
        return store.dispatch(actions.showCelsius(isInputChecked))
    }

    toggleFahrenheit(e, isInputChecked) {
        if (!isInputChecked) {
            this.props.settings.temperature.celsiusFirst.isInputChecked = isInputChecked;
            if (!this.props.settings.temperature.celsius.isInputChecked) {
                this.props.settings.temperature.celsius.isInputChecked = !isInputChecked;
            }
        }
        return store.dispatch(actions.showFahrenheit(isInputChecked))
    }

    toggleCelsiusFirst(e, isInputChecked) {
        return store.dispatch(actions.celsiusFirst(isInputChecked))
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
                <form className="submitlocation" onSubmit={this.onSubmit}>
                    <label htmlFor="enterlocation">Location </label>
                    <input id="enterlocation" type="text" name="location"
                        onChange={this.locationFieldChange} value={this.state.locationField} /><br />
                    {!this.props.settings.validLocation ? <span>Please enter a valid location</span> : <span></span>}
                    {!this.props.settings.validLocation ? <br /> : null}
                    <button className="enter-location-button" type="submit" value="Submit">Change Location</button>
                </form>
                {this.enterLocation()}
                {this.saveSettingsButton()}
                <div className="options-container">
                    <div className="left-side">
                        <div className="weatherSettings">
                            <h3>Weather</h3>
                            <div className="option-container">
                                <Toggle
                                    label="Location"
                                    style={styles.toggle}
                                    labelStyle={styles.labelStyle}
                                    defaultToggled={this.props.settings.location.isInputChecked}
                                    onToggle={this.toggleLocation}
                                    disabled={this.props.settings.location.location ? false : true}
                                />
                            </div>
                            <div className="option-container">
                                <Toggle
                                    label="Description"
                                    style={styles.toggle}
                                    labelStyle={styles.labelStyle}
                                    defaultToggled={this.props.settings.description.isInputChecked}
                                    onToggle={this.toggleDescription}
                                    disabled={this.props.settings.location.location ? false : true}
                                />
                            </div>
                            <div className="option-container">
                                <Toggle
                                    label="Visual"
                                    style={styles.toggle}
                                    labelStyle={styles.labelStyle}
                                    defaultToggled={this.props.settings.visual.isInputChecked}
                                    onToggle={this.toggleVisual}
                                    disabled={this.props.settings.location.location ? false : true}
                                />
                            </div>
                            <div className="temperatureSettings">
                                <div className="option-container">
                                    <Toggle
                                        label="Temp"
                                        style={styles.toggle}
                                        labelStyle={styles.labelStyle}
                                        defaultToggled={this.props.settings.temperature.isInputChecked}
                                        onToggle={this.toggleTemperature}
                                        toggled={this.props.settings.temperature.isInputChecked}
                                        disabled={this.props.settings.location.location ? false : true}
                                    />
                                </div>
                                <div className="option-container">
                                    <Toggle
                                        label="Fahrenheit"
                                        style={styles.toggleSub}
                                        labelStyle={styles.labelStyle}
                                        labelPosition='right'
                                        defaultToggled={this.props.settings.temperature.fahrenheit.isInputChecked}
                                        onToggle={this.toggleFahrenheit}
                                        toggled={this.props.settings.temperature.fahrenheit.isInputChecked}
                                        disabled={!this.props.settings.location.location || !this.props.settings.temperature.isInputChecked ? true : false}
                                    />
                                </div>
                                <div className="option-container">
                                    <Toggle
                                        label="Celsius"
                                        style={styles.toggleSub}
                                        labelStyle={styles.labelStyle}
                                        labelPosition='right'
                                        defaultToggled={this.props.settings.temperature.celsius.isInputChecked}
                                        onToggle={this.toggleCelsius}
                                        toggled={this.props.settings.temperature.celsius.isInputChecked}
                                        disabled={!this.props.settings.location.location || !this.props.settings.temperature.isInputChecked ? true : false}
                                    />
                                </div>
                                <div className="option-container">
                                    <Toggle
                                        label="C (F)"
                                        style={styles.toggleSub}
                                        labelStyle={styles.labelStyle}
                                        labelPosition='right'
                                        defaultToggled={this.props.settings.temperature.celsiusFirst.isInputChecked}
                                        onToggle={this.toggleCelsiusFirst}
                                        toggled={this.props.settings.temperature.celsiusFirst.isInputChecked}
                                        disabled={this.props.settings.location.location && this.props.settings.temperature.fahrenheit.isInputChecked && this.props.settings.temperature.celsius.isInputChecked ? false : true}
                                    />
                                </div>
                            </div>
                            <div className="webcamSettings">
                                <div className="option-container">
                                    <Toggle
                                        label="Webcam"
                                        style={styles.toggle}
                                        labelStyle={styles.labelStyle}
                                        defaultToggled={this.props.settings.webcam.isInputChecked}
                                        onToggle={this.toggleWebcam}
                                        disabled={this.props.settings.location.location ? false : true}
                                    />
                                </div>
                                {this.props.settings.webcam.isInputChecked ? <Link to="/webcams">Explore Webcams</Link> : null}
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <h3>Time & Date</h3>
                        <div className="timeSettings">
                            <div className="option-container">
                                <Toggle
                                    label="Time"
                                    style={styles.toggle}
                                    labelStyle={styles.labelStyle}
                                    defaultToggled={this.props.settings.time.isInputChecked}
                                    onToggle={this.toggleTime}
                                    disabled={false}
                                />
                            </div>
                            <div className="option-container">
                                <Toggle
                                    label="12-hour"
                                    style={styles.toggleSub}
                                    labelStyle={styles.labelStyle}
                                    labelPosition='right'
                                    defaultToggled={this.props.settings.time.twelve.isInputChecked}
                                    onToggle={this.toggleTwelve}
                                    disabled={this.props.settings.time.isInputChecked ? false : true}
                                />
                            </div>
                            <div className="option-container">
                                <Toggle
                                    label="seconds"
                                    style={styles.toggleSub}
                                    labelStyle={styles.labelStyle}
                                    labelPosition='right'
                                    defaultToggled={this.props.settings.time.seconds.isInputChecked}
                                    onToggle={this.toggleSeconds}
                                    disabled={this.props.settings.time.isInputChecked ? false : true}
                                />
                            </div>
                            <div className="option-container">
                                <Toggle
                                    label="AM/PM"
                                    style={styles.toggleSub}
                                    labelStyle={styles.labelStyle}
                                    labelPosition='right'
                                    defaultToggled={this.props.settings.time.meridiem.isInputChecked}
                                    onToggle={this.toggleMeridiem}
                                    disabled={this.props.settings.time.isInputChecked && this.props.settings.time.twelve.isInputChecked ? false : true}
                                />
                            </div>
                        </div>
                        <div className="dateSettings">
                            <div className="option-container">
                                <Toggle
                                    label="Date"
                                    style={styles.toggle}
                                    labelStyle={styles.labelStyle}
                                    defaultToggled={this.props.settings.date.isInputChecked}
                                    onToggle={this.toggleDate}
                                    disabled={false}
                                />
                            </div>
                            <div className="option-container">
                                <Toggle
                                    label="Numerical"
                                    style={styles.toggleSub}
                                    labelStyle={styles.labelStyle}
                                    labelPosition='right'
                                    defaultToggled={this.props.settings.date.numerical.isInputChecked}
                                    onToggle={this.toggleNumerical}
                                    disabled={this.props.settings.date.isInputChecked ? false : true}
                                />
                            </div>
                        </div>
                        <div className="colorSettings">
                            <h3>Color & Themes</h3>
                            <div className="backgroundSettings">
                                <h4>Background</h4>
                                <div className="option-container">
                                    <RadioButtonGroup
                                        onChange={this.backgroundHandler}
                                        className="background-radioButtons"
                                        name="background"
                                        defaultSelected={this.props.settings.background.color}
                                        children={[
                                            <RadioButton
                                                className="radio-button"
                                                value="black"
                                                label="Black"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="gray"
                                                label="Gray"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="navy"
                                                label="Navy"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="maroon"
                                                label="Maroon"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="teal"
                                                label="Teal"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />
                                        ]}
                                    />
                                </div>
                                <h4>Foreground</h4>
                                <div className="option-container">
                                    <RadioButtonGroup
                                        onChange={this.foregroundHandler}
                                        className="foreground-radioButtons"
                                        name="foreground"
                                        defaultSelected={this.props.settings.foreground.color}
                                        children={[
                                            <RadioButton
                                                className="radio-button"
                                                value="rgba(0,255,255, 1)"
                                                label="Aqua"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="rgba(0,255,0,1)"
                                                label="Lime"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="rgba(255,0,255,1)"
                                                label="Fuchsia"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="rgba(255,255,0,1)"
                                                label="Yellow"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />,
                                            <RadioButton
                                                className="radio-button"
                                                value="rgba(255,255,255,1)"
                                                label="White"
                                                style={styles.backgroundButton}
                                                labelStyle={styles.backgroundLabel}
                                                iconStyle={styles.backgroundIcon}
                                                labelPosition="left"
                                            />
                                        ]}
                                    />
                                    <Toggle
                                        label="Apply Visual"
                                        style={styles.toggle}
                                        labelStyle={styles.labelStyle}
                                        defaultToggled={this.props.settings.foreground.applyVisual}
                                        onToggle={this.toggleApplyVisual}
                                        disabled={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    settings: state.user.settings,
    // webcams: state.user.whether.webcams
})

export default connect(mapStateToProps)(withRouter(Settings));