import React, { Component } from 'react'
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import './BackgroundSettings.css'
import store from '../../store';
import * as actions from '../../actions/index';

const styles = {
    backgroundButton: {
        marginBottom: '2px',
        width: '50%'
    },
    backgroundLabel: {
        color: 'black'
    },
    backgroundIcon: {
        fill: 'black'
    }
}

class BackgroundSettings extends Component {
    constructor(props) {
        super(props)

        this.backgroundHandler = this.backgroundHandler.bind(this);
    }

    backgroundHandler(e, value) {
        return store.dispatch(actions.backgroundChoice(value))
    }

    render() {
        return (
            <div className="option-container">
                <RadioButtonGroup
                    onChange={this.backgroundHandler}
                    className="background-radioButtons"
                    name="background"
                    defaultSelected={this.props.settings.background.color}
                    children={[
                        <RadioButton
                            className="radio-button"
                            value="black"
                            label="Black"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="gray"
                            label="Gray"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="navy"
                            label="Navy"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="maroon"
                            label="Maroon"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />,
                        <RadioButton
                            className="radio-button"
                            value="teal"
                            label="Teal"
                            style={styles.backgroundButton}
                            labelStyle={styles.backgroundLabel}
                            iconStyle={styles.backgroundIcon}
                            labelPosition="left"
                        />
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings
})

export default connect(mapStateToProps)(BackgroundSettings);