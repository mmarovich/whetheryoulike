import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import '../styles/Location.css';
import store from '../store';
import * as actions from '../actions/index';

class Location extends Component {

    dragStopHandler(e) {
        console.log(e.target);
        const splitStyle = e.target.style.transform.split(",")
        console.log(splitStyle);
        const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
        const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
        return store.dispatch(actions.locationPosition(x, y))
    }

    render() {
        if (this.props.settings.location.isInputChecked) {
            return (
                <div className="location-container">
                    <Draggable
                        axis='both'
                        onStop={(e) => this.dragStopHandler(e)}
                        grid={[1, 1]}
                        defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                        <div className="location" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                            {this.props.observation.display_location.full}
                        </div>
                    </Draggable>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = (state, props) => ({
    observation: state.user.whether.current_observation,
    settings: state.user.settings,
    position: state.user.settings.position.location
})

export default connect(mapStateToProps)(withRouter(Location));