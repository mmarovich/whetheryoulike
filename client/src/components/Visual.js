import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { TiWeatherSunny as Sunny } from 'react-icons/lib/ti';
import { TiWeatherPartlySunny as PartlyCloudy } from 'react-icons/lib/ti';
import { TiWeatherDownpour as Rain } from 'react-icons/lib/ti';
import { TiWeatherNight as Night } from 'react-icons/lib/ti';
import { MdCloud as Cloud } from 'react-icons/lib/md';

import '../styles/Visual.css';
import store from '../store';
import * as actions from '../actions/index';


class Visual extends Component {

    dragStopHandler(e, num) {
        if (e.target.parentNode.style.transform === "") {
            num = 1;
        }
        if (num === null) {
            console.log(num)
            console.log(e.target.parentNode);
            const splitStyle = e.target.parentNode.style.transform.split(",")
            console.log(splitStyle);
            const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
            const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
            return store.dispatch(actions.visualPosition(x, y))
        }
        if (num === 1) {
            console.log(num)
            console.log(e.target.parentNode.parentNode.parentNode);
            const splitStyle = e.target.parentNode.parentNode.parentNode.style.transform.split(",")
            console.log(splitStyle);
            const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
            const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
            return store.dispatch(actions.visualPosition(x, y))
        } else {
            return;
        }
    }

    render() {
        let currentTime = this.props.astronomy ? Number(this.props.astronomy.current_time.hour + this.props.astronomy.current_time.minute) : null;
        let sunRise = this.props.astronomy ? Number(this.props.astronomy.sunrise.hour + this.props.astronomy.sunrise.minute) : null;
        let sunSet = this.props.astronomy ? Number(this.props.astronomy.sunset.hour + this.props.astronomy.sunset.minute) : null;
        if (this.props.observation && this.props.settings.visual.isInputChecked) {
            if (currentTime > sunRise && currentTime < sunSet) {
                if (this.props.observation.weather === "Clear") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, null)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <Sunny className="sunnyIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
                if (this.props.observation.weather === "Overcast") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, null)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <Cloud className="cloudIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
                if (this.props.observation.weather === "Mostly Cloudy" || this.props.observation.weather === "Partly Cloudy" || this.props.observation.weather === "Scattered Clouds") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, null)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <PartlyCloudy className="partlyCloudyIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
                if (this.props.observation.weather === "Rain") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, null)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <Rain className="rainIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
            } else if (currentTime > sunSet && currentTime < Number(2400) || currentTime < sunRise) {
                if (this.props.observation.weather === "Clear") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, null)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <Night className="nightIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
                if (this.props.observation.weather === "Overcast") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, null)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <Cloud className="cloudIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
                if (this.props.observation.weather === "Mostly Cloudy" || this.props.observation.weather === "Partly Cloudy" || this.props.observation.weather === "Scattered Clouds") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, 1)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <Night className="small-nightIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                    <Cloud className="cloudIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
                if (this.props.observation.weather === "Rain") {
                    return (
                        <div className="visual-container">
                            <Draggable
                                axis='both'
                                onStop={(e) => this.dragStopHandler(e, 1)}
                                grid={[1, 1]}
                                defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                                <div className="visual" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                                    <Rain className="rainIcon" style={{color: this.props.settings.foreground.applyVisual ? this.props.settings.foreground.color : null}} />
                                </div>
                            </Draggable>
                        </div>
                    )
                }
            }
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = (state, props) => ({
    observation: state.user.whether.current_observation,
    astronomy: state.user.whether.moon_phase,
    settings: state.user.settings,
    position: state.user.settings.position.visual
})

export default connect(mapStateToProps)(withRouter(Visual));