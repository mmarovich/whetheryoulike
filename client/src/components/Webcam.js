import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import '../styles/Webcam.css';
import store from '../store';
import * as actions from '../actions/index';

class Webcam extends Component {

    dragStopHandler(e) {
        console.log(e.target.parentNode);
        const splitStyle = e.target.parentNode.style.transform.split(",")
        console.log(splitStyle);
        const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
        const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
        return store.dispatch(actions.webcamPosition(x, y))
    }

    render() {
        if (this.props.settings.webcam.isInputChecked) {
            return (
                <div className="webcam-container">
                    <Draggable
                        axis='y'
                        bounds={{top: 0, bottom: Math.floor((window.innerHeight - (window.innerWidth * .9)))}}
                        onStop={(e) => this.dragStopHandler(e)}
                        grid={[1, 1]}
                        defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                        <div className="webcam" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)` }}>
                            <img className="webcam-img" alt="webcam" src={!this.props.settings.webcam.cam ? '../../assets/PickAWebcam.png' : this.props.settings.webcam.cam.CURRENTIMAGEURL} />
                            <p>{!this.props.settings.webcam.cam ? "Please choose a webcam" : this.props.settings.webcam.cam.city + ", " + this.props.settings.webcam.cam.state}</p>
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
    settings: state.user.settings,
    position: state.user.settings.position.webcam,
    webcams: state.user.whether.webcams
})

export default connect(mapStateToProps)(withRouter(Webcam));