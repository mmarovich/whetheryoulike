import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import '../styles/Description.css';
import store from '../store';
import * as actions from '../actions/index';

class Description extends Component {

    dragStopHandler(e) {
        console.log(e.target);
        const splitStyle = e.target.style.transform.split(",")
        console.log(splitStyle);
        const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
        const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
        return store.dispatch(actions.descriptionPosition(x, y))
    }

    render() {
        if (this.props.settings.description.isInputChecked) {
            return (
                <div className="description-container">
                    <Draggable
                        axis='both'
                        onStop={(e) => this.dragStopHandler(e)}
                        grid={[1, 1]}
                        defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                        <div className="description" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                            {this.props.observation.weather}
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
    position: state.user.settings.position.description
})

export default connect(mapStateToProps)(withRouter(Description));