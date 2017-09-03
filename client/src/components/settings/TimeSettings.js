import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'

import './TimeSettings.css'
import store from '../../store';
import * as actions from '../../actions/index';

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

class TimeSettings extends Component {
    constructor(props) {
        super(props)

        this.toggleTime = this.toggleTime.bind(this);
        this.toggleTwelve = this.toggleTwelve.bind(this);
        this.toggleSeconds = this.toggleSeconds.bind(this);
        this.toggleMeridiem = this.toggleMeridiem.bind(this);
    }

    toggleTime(e, isInputChecked) {
        return store.dispatch(actions.showTime(isInputChecked))
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

    toggleMeridiem(e, isInputChecked) {
        if (!isInputChecked) {
            return store.dispatch(actions.showMeridiem(isInputChecked, ''))
        } else {
            return store.dispatch(actions.showMeridiem(isInputChecked, ' A'))
        }
    }

    render() {
        return (
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
        )
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings
})

export default connect(mapStateToProps)(withRouter(TimeSettings));