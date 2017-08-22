import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Toggle from 'material-ui/Toggle';

import store from '../../store';
import * as actions from '../../actions/index';
import './WeatherSettings.css';

const styles = {
    toggle: {
        marginBottom: '8px',
        width: '100%',
        display: 'inline-block'
    },
    labelStyle: {
        color: 'black',
        width: '50%'
    },
    toggleSub: {
        width: '90%',
        display: 'inline-block',
        paddingLeft: '20px',
        fontSize: '15px'
    },
}

class WeatherSettings extends Component {
    constructor(props) {
        super(props)

        this.toggleLocation = this.toggleLocation.bind(this);
        this.toggleDescription = this.toggleDescription.bind(this);
        this.toggleVisual = this.toggleVisual.bind(this);
        this.toggleTemperature = this.toggleTemperature.bind(this);
        this.toggleFahrenheit = this.toggleFahrenheit.bind(this);
        this.toggleCelsius = this.toggleCelsius.bind(this);
        this.toggleCelsiusFirst = this.toggleCelsiusFirst.bind(this);
        this.toggleWebcam = this.toggleWebcam.bind(this);
    }

    toggleLocation(e, isInputChecked) {
        return store.dispatch(actions.showLocation(isInputChecked))
    }

    toggleDescription(e, isInputChecked) {
        return store.dispatch(actions.showDescription(isInputChecked))
    }

    toggleVisual(e, isInputChecked) {
        return store.dispatch(actions.showVisual(isInputChecked))
    }

    toggleTemperature(e, isInputChecked) {
        return store.dispatch(actions.showTemperature(isInputChecked))
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

    toggleCelsius(e, isInputChecked) {
        if (!isInputChecked) {
            this.props.settings.temperature.celsiusFirst.isInputChecked = isInputChecked;
            if (!this.props.settings.temperature.fahrenheit.isInputChecked) {
                this.props.settings.temperature.fahrenheit.isInputChecked = !isInputChecked;
            }
        }
        return store.dispatch(actions.showCelsius(isInputChecked))
    }

    toggleCelsiusFirst(e, isInputChecked) {
        return store.dispatch(actions.celsiusFirst(isInputChecked))
    }

    toggleWebcam(e, isInputChecked) {
        const ObjOrBool = this.props.settings.webcam.cam !== false ? this.props.settings.webcam.cam : false;
        if (!isInputChecked) {
            return store.dispatch(actions.showWebcam(isInputChecked, ObjOrBool))
        } else {
            return store.dispatch(actions.showWebcam(isInputChecked, ObjOrBool))
        }
    }

    render() {
        return (
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
        )
    }
}

const mapStateToProps = (state, props) => ({
    user: state.user,
    settings: state.user.settings
})

export default connect(mapStateToProps)(withRouter(WeatherSettings));