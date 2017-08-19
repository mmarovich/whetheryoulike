import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { TiWeatherSunny as Sunny } from 'react-icons/lib/ti';
import { TiWeatherPartlySunny as PartlyCloudy } from 'react-icons/lib/ti';
import { TiWeatherDownpour as Rain } from 'react-icons/lib/ti';
import { TiWeatherNight as Night } from 'react-icons/lib/ti';
import { MdCloud as Cloud } from 'react-icons/lib/md';

import '../styles/Home.css';

moment.locale('en');

class Home extends Component {
    constructor(props) {
        super(props)

        this.grabMoment = this.grabMoment.bind(this)
        this.renderTime = this.renderTime.bind(this)
        this.renderDate = this.renderDate.bind(this)
        this.renderVisual = this.renderVisual.bind(this)
        this.renderLocation = this.renderLocation.bind(this)
        this.renderDescription = this.renderDescription.bind(this)
        this.renderWebcam = this.renderWebcam.bind(this)
        this.renderTemperature = this.renderTemperature.bind(this)

        this.state = {
            time: '',
            date: ''
        }
    }

    componentDidMount() {
        this.grabMoment()
    }

    componentWillUnmount() {
        clearInterval(this.momentId)
    }

    grabMoment() {
        if (this.props.settings.time.isInputChecked || this.props.settings.date.isInputChecked) {
            const hour = this.props.settings.time.twelve.hourString
            const seconds = this.props.settings.time.seconds.secondsString
            const meridiem = this.props.settings.time.meridiem.meridiemString
            const month = this.props.settings.date.month.monthString
            const year = this.props.settings.date.year.yearString
            this.momentId = setInterval(() => {
                this.setState({
                    time: moment().format(
                        hour + 'mm' + seconds + meridiem
                    ),
                    date: moment().format(
                        month + year
                    )
                })
            }, 500)
        }
    }

    renderTime() {
        if (this.props.settings.time.saved_isInputChecked) {
            return (
                <div className="time" style={{ transform: `translate(${this.props.position.time.saved_x}px,${this.props.position.time.saved_y}px)`, color: this.props.settings.foreground.color }}>
                    {this.state.time}
                </div>
            )
        } else {
            return <div></div>
        }
    }

    renderDate() {
        if (this.props.settings.date.saved_isInputChecked) {
            return (
                <div className="date" style={{ transform: `translate(${this.props.position.date.saved_x}px,${this.props.position.date.saved_y}px)`, color: this.props.settings.foreground.color }}>
                    {this.state.date}
                </div>
            )
        } else {
            return <div></div>
        }
    }

    renderVisual() {
        let currentTime = this.props.astronomy ? Number(this.props.astronomy.current_time.hour + this.props.astronomy.current_time.minute) : null;
        let sunRise = this.props.astronomy ? Number(this.props.astronomy.sunrise.hour + this.props.astronomy.sunrise.minute) : null;
        let sunSet = this.props.astronomy ? Number(this.props.astronomy.sunset.hour + this.props.astronomy.sunset.minute) : null;
        if (this.props.observation && this.props.settings.visual.saved_isInputChecked) {
            if (currentTime > sunRise && currentTime < sunSet) {
                if (this.props.observation.weather === "Clear") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <Sunny className="sunnyIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
                if (this.props.observation.weather === "Overcast") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <Cloud className="cloudIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
                if (this.props.observation.weather === "Mostly Cloudy" || this.props.observation.weather === "Partly Cloudy" || this.props.observation.weather === "Scattered Clouds") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <PartlyCloudy className="partlyCloudyIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
                if (this.props.observation.weather === "Rain") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <Rain className="rainIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
            } else if (currentTime > sunSet && currentTime < Number(2400) || currentTime < sunRise) {
                if (this.props.observation.weather === "Clear") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <Night className="nightIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
                if (this.props.observation.weather === "Overcast") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <Cloud className="cloudIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
                if (this.props.observation.weather === "Mostly Cloudy" || this.props.observation.weather === "Partly Cloudy" || this.props.observation.weather === "Scattered Clouds") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <Night className="small-nightIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                            <Cloud className="cloudIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
                if (this.props.observation.weather === "Rain") {
                    return (
                        <div className="visual" style={{ transform: `translate(${this.props.position.visual.saved_x}px,${this.props.position.visual.saved_y}px)` }}>
                            <Rain className="rainIcon" style={{ color: this.props.settings.foreground.saved_applyVisual ? this.props.settings.foreground.saved_color : null }} />
                        </div>
                    )
                }
            }
        } else {
            return <div></div>
        }
    }

    renderLocation() {
        if (this.props.settings.location.saved_isInputChecked) {
            return (
                <div className="location" style={{ transform: `translate(${this.props.position.location.saved_x}px,${this.props.position.location.saved_y}px)`, color: this.props.settings.foreground.saved_color }}>
                    {this.props.observation.display_location.full}
                </div>
            )
        } else {
            return null;
        }
    }

    renderDescription() {
        if (this.props.settings.description.saved_isInputChecked) {
            return (
                <div className="description" style={{ transform: `translate(${this.props.position.description.saved_x}px,${this.props.position.description.saved_y}px)`, color: this.props.settings.foreground.saved_color }}>
                    {this.props.observation.weather}
                </div>
            )
        } else {
            return null;
        }
    }

    renderWebcam() {
        if (this.props.settings.webcam.saved_isInputChecked) {
            return (
                <div className="webcam" style={{ transform: `translate(${this.props.position.webcam.saved_x}px,${this.props.position.webcam.saved_y}px)` }}>
                    <img className="webcam-img" alt="webcam" src={!this.props.settings.webcam.saved_cam ? '../../assets/PickAWebcam.png' : this.props.settings.webcam.saved_cam.CURRENTIMAGEURL} />
                    <p>{!this.props.settings.webcam.saved_cam ? "Please choose a webcam" : this.props.settings.webcam.saved_cam.city + ", " + this.props.settings.webcam.saved_cam.state}</p>
                </div>
            )
        } else {
            return null;
        }
    }

    renderTemperature() {
        if (this.props.settings.temperature.saved_isInputChecked) {
            if (!this.props.settings.temperature.fahrenheit.saved_isInputChecked && !this.props.settings.temperature.celsius.saved_isInputChecked) {
                return (
                    <div className="temperature" style={{ transform: `translate(${this.props.position.temperature.saved_x}px,${this.props.position.temperature.saved_y}px)`, color: this.props.settings.foreground.saved_color }}>
                        {this.props.observation.temp_f + '°F (' + this.props.observation.temp_c + '°C)'}
                    </div>
                )
            }
            if (this.props.settings.temperature.fahrenheit.saved_isInputChecked && !this.props.settings.temperature.celsius.saved_isInputChecked) {
                return (
                    <div className="temperature" style={{ transform: `translate(${this.props.position.temperature.saved_x}px,${this.props.position.temperature.saved_y}px)`, color: this.props.settings.foreground.saved_color }}>
                        {this.props.observation.temp_f + '°F'}
                    </div>
                )
            }
            if (this.props.settings.temperature.celsius.saved_isInputChecked && !this.props.settings.temperature.fahrenheit.saved_isInputChecked) {
                return (
                    <div className="temperature" style={{ transform: `translate(${this.props.position.temperature.saved_x}px,${this.props.position.temperature.saved_y}px)`, color: this.props.settings.foreground.saved_color }}>
                        {this.props.observation.temp_c + '°C'}
                    </div>
                )
            }
            if (this.props.settings.temperature.fahrenheit.saved_isInputChecked && this.props.settings.temperature.celsius.saved_isInputChecked && !this.props.settings.temperature.celsiusFirst.saved_isInputChecked) {
                return (
                    <div className="temperature" style={{ transform: `translate(${this.props.position.temperature.saved_x}px,${this.props.position.temperature.saved_y}px)`, color: this.props.settings.foreground.saved_color }}>
                        {this.props.observation.temp_f + '°F (' + this.props.observation.temp_c + '°C)'}
                    </div>
                )
            }
            if (this.props.settings.temperature.fahrenheit.saved_isInputChecked && this.props.settings.temperature.celsius.saved_isInputChecked && this.props.settings.temperature.celsiusFirst.saved_isInputChecked) {
                return (
                    <div className="temperature" style={{ transform: `translate(${this.props.position.temperature.saved_x}px,${this.props.position.temperature.saved_y}px)`, color: this.props.settings.foreground.saved_color }}>
                        {this.props.observation.temp_c + '°C (' + this.props.observation.temp_f + '°F)'}
                    </div>
                )
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="yourWhether-container">
                <div className="yourWhether" style={{ backgroundColor: this.props.settings.background.saved_color }}>
                    {this.renderTime()}
                    {this.renderDate()}
                    {this.renderVisual()}
                    {this.renderLocation()}
                    {this.renderDescription()}
                    {this.renderWebcam()}
                    {this.renderTemperature()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings,
    position: state.user.settings.position,
    observation: state.user.whether.current_observation,
    astronomy: state.user.whether.moon_phase
})

export default connect(mapStateToProps)(withRouter(Home));