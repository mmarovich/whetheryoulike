import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import '../styles/Temperature.css';
import store from '../store';
import * as actions from '../actions/index';

class Temperature extends Component {

    dragStopHandler(e) {
        console.log(e.target);
        const splitStyle = e.target.style.transform.split(",")
        console.log(splitStyle);
        const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
        const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
        return store.dispatch(actions.temperaturePosition(x, y))
    }

    render() {
        if (this.props.temperature.isInputChecked) {
            if (!this.props.temperature.fahrenheit.isInputChecked && !this.props.temperature.celsius.isInputChecked) {
                return (
                    <div className="temperature-container">
                        <Draggable
                            axis='both'
                            onStop={(e) => this.dragStopHandler(e)}
                            grid={[1, 1]}
                            defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                            <div className="temperature" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                                {this.props.observation.temp_f + '°F (' + this.props.observation.temp_c + '°C)'}
                            </div>
                        </Draggable>
                    </div>
                )
            }
            if (this.props.temperature.fahrenheit.isInputChecked && !this.props.temperature.celsius.isInputChecked) {
                return (
                    <div className="temperature-container">
                        <Draggable
                            axis='both'
                            onStop={(e) => this.dragStopHandler(e)}
                            grid={[1, 1]}
                            defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                            <div className="temperature" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                                {this.props.observation.temp_f + '°F'}
                            </div>
                        </Draggable>
                    </div>
                )
            }
            if (this.props.temperature.celsius.isInputChecked && !this.props.temperature.fahrenheit.isInputChecked) {
                return (
                    <div className="temperature-container">
                        <Draggable
                            axis='both'
                            onStop={(e) => this.dragStopHandler(e)}
                            grid={[1, 1]}
                            defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                            <div className="temperature" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                                {this.props.observation.temp_c + '°C'}
                            </div>
                        </Draggable>
                    </div>
                )
            }
            if (this.props.temperature.fahrenheit.isInputChecked && this.props.temperature.celsius.isInputChecked && !this.props.temperature.celsiusFirst.isInputChecked) {
                return (
                    <div className="temperature-container">
                        <Draggable
                            axis='both'
                            onStop={(e) => this.dragStopHandler(e)}
                            grid={[1, 1]}
                            defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                            <div className="temperature" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                                {this.props.observation.temp_f + '°F (' + this.props.observation.temp_c + '°C)'}
                            </div>
                        </Draggable>
                    </div>
                )
            }
            if (this.props.temperature.fahrenheit.isInputChecked && this.props.temperature.celsius.isInputChecked && this.props.temperature.celsiusFirst.isInputChecked) {
                return (
                    <div className="temperature-container">
                        <Draggable
                            axis='both'
                            onStop={(e) => this.dragStopHandler(e)}
                            grid={[1, 1]}
                            defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                            <div className="temperature" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                                {this.props.observation.temp_c + '°C (' + this.props.observation.temp_f + '°F)'}
                            </div>
                        </Draggable>
                    </div>
                )
            }
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings,
    observation: state.user.whether.current_observation,
    temperature: state.user.settings.temperature,
    position: state.user.settings.position.temperature
})

export default connect(mapStateToProps)(withRouter(Temperature));