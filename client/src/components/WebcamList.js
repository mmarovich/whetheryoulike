import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import '../styles/WebcamList.css';
import store from '../store';
import * as actions from '../actions/index';

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
        width: '50%'
    },
    label: {
        color: 'black'
    },
    icon: {
        color: 'black',
        fill: 'black'

    }
};

class WebcamList extends Component {
    constructor(props) {
        super(props)

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(e, value) {
        return store.dispatch(actions.camChoice(value))
    }



    render() {
        const webcams = (this.props.webcams ? this.props.webcams.map((item, key) => {
            return <RadioButton
                className="radio-button"
                value={item}
                label={item.city + ", " + item.state}
                style={styles.radioButton}
                labelStyle={styles.label}
                iconStyle={styles.icon}
                labelPosition="left"
            />
        }) : [])
        return (
            <div className="chooseCam-container">
                <div className="preview-container">
                    <p>If image is broken, the webcam is either down or we don't have permission</p>
                    <img className="camPreview" alt="cam preview" src={this.props.cam ? this.props.cam.CURRENTIMAGEURL : null} />
                </div>
                <RadioButtonGroup
                    onChange={this.clickHandler}
                    children={webcams}
                    className="webcam-radioButtons"
                    name="webcam" />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    cam: state.user.settings.webcam.cam,
    webcams: state.user.whether.webcams
})

export default connect(mapStateToProps)(withRouter(WebcamList));