import React, { Component } from 'react';
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import '../styles/Date.css';
import store from '../store';
import * as actions from '../actions/index';

moment.locale('en');

class Date extends Component {
    constructor(props) {
        super(props)

        this.grabMoment = this.grabMoment.bind(this);

        this.state = {
            date: ''
        }
    }

    componentDidMount() {
        this.grabMoment()
    }

    componentWillUnmount() {
        clearInterval(this.momentId)
    }

    grabMoment() {
        const month = this.props.settings.date.month.monthString
        const year = this.props.settings.date.year.yearString
        this.momentId = setInterval(() => {
            this.setState({
                date: moment().format(
                    month + year
                )
            })
        }, 1000)
    }

    dragStopHandler(e) {
        console.log(e.target);
        const splitStyle = e.target.style.transform.split(",")
        console.log(splitStyle);
        const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
        const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
        return store.dispatch(actions.datePosition(x, y))
    }

    render() {
        if (this.props.settings.date.isInputChecked) {
            return (
                <div className="date-container">
                    <Draggable
                        axis='both'
                        onStop={(e) => this.dragStopHandler(e)}
                        grid={[1, 1]}
                        defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                        <div className="date" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                            {this.state.date}
                        </div>
                    </Draggable>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings,
    position: state.user.settings.position.date
})

export default connect(mapStateToProps)(withRouter(Date));