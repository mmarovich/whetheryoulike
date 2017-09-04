import React, { Component } from 'react'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'


import './ForegroundSettings.css'
import store from '../../store'
import * as actions from '../../actions/index'

const styles = {
    toggle: {
        marginBottom: '8px',
        width: '100%',
        display: 'inline-block'
    },
    backgroundButton: {
        marginBottom: '2px',
        width: '50%'
    },
    backgroundLabel: {
        color: 'black'
    },
    backgroundIcon: {
        fill: 'black'
    },
    labelStyle: {
        color: 'black',
        width: '50%'
    }
}


class ForegroundSettings extends Component {
    constructor(props) {
        super(props)

        this.foregroundHandler = this.foregroundHandler.bind(this);
        this.toggleApplyVisual = this.toggleApplyVisual.bind(this);
    }

    foregroundHandler(e, value) {
        return store.dispatch(actions.foregroundChoice(value))
    }

    toggleApplyVisual(e, applyVisual) {
        return store.dispatch(actions.applyVisual(applyVisual))
    }

    render() {
        return (
            <div className="option-container">
                <RadioButtonGroup
                    onChange={this.foregroundHandler}
                    className="foreground-radioButtons"
                    name="foreground"
                    defaultSelected={this.props.settings.foreground.color}
                    children={[
                        <RadioButton
                            className="radio-button"
                            value="rgba(0,255,255, 1)"
                            label="Aqua"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="rgba(0,255,0,1)"
                            label="Lime"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="rgba(255,0,255,1)"
                            label="Fuchsia"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="rgba(255,255,0,1)"
                            label="Yellow"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="rgba(255,255,255,1)"
                            label="White"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />
                    ]}
                />
                <Toggle
                    label="Apply Visual"
                    style={styles.toggle}
                    labelStyle={styles.labelStyle}
                    defaultToggled={this.props.settings.foreground.applyVisual}
                    onToggle={this.toggleApplyVisual}
                    disabled={false}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings
})

export default connect(mapStateToProps)(ForegroundSettings);