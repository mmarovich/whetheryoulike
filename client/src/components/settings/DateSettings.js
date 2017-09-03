import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'

import './DateSettings.css'
import store from '../../store';
import * as actions from '../../actions/index';

const styles = {
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
    labelStyle: {
        color: 'black',
        width: '50%'
    }
}

export class DateSettings extends Component {
    constructor(props) {
        super(props)

        this.toggleDate = this.toggleDate.bind(this);
        this.toggleNumerical = this.toggleNumerical.bind(this);
    }

    toggleDate(e, isInputChecked) {
        return store.dispatch(actions.showDate(isInputChecked))
    }

    toggleNumerical(e, isInputChecked) {
        if (!isInputChecked) {
            return store.dispatch(actions.showNumerical(isInputChecked, 'MMMM Do, ', 'YYYY'))
        } else {
            return store.dispatch(actions.showNumerical(isInputChecked, 'M/D/', 'YYYY'))
        }
    }

    render() {
        return (
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
        )
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings
})

export default connect(mapStateToProps)(DateSettings);