import React, { Component } from 'react';
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

import '../styles/Time.css';
import store from '../store';
import * as actions from '../actions/index';

moment.locale('en')

class Time extends Component {
    constructor(props) {
        super(props)

        this.grabMoment = this.grabMoment.bind(this);

        this.state = {
            time: '',
        }
    }

    componentDidMount() {
        this.grabMoment()
    }

    componentWillUnmount() {
        clearInterval(this.momentId)
    }

    grabMoment() {
        const hour = this.props.settings.time.twelve.hourString
        const seconds = this.props.settings.time.seconds.secondsString
        const meridiem = this.props.settings.time.meridiem.meridiemString
        this.momentId = setInterval(() => {
            this.setState({
                time: moment().format(
                    hour + 'mm' + seconds + meridiem
                )
            })
        }, 500)
    }

    dragStopHandler(e) {
        console.log(e.target);
        const splitStyle = e.target.style.transform.split(",")
        console.log(splitStyle);
        const x = Math.floor(Number(splitStyle[0].replace(/\D/g, '' || "")));
        const y = Math.floor(Number(splitStyle[1].replace(/\D/g, '' || "")));
        return store.dispatch(actions.timePosition(x, y))
    }



    render() {
        if (this.props.settings.time.isInputChecked) {
            return <div className="time-container" style={{color: 'red'}}>
                <Draggable
                    axis='both'
                    onStop={(e) => this.dragStopHandler(e)}
                    grid={[1, 1]}
                    defaultPosition={{ x: Number(this.props.position.x), y: Number(this.props.position.y) }}>
                    <div className="time" style={{ transform: `translate(${this.props.position.x}px,${this.props.position.y}px)`, color: this.props.settings.foreground.color }}>
                        {this.state.time}
                    </div>
                </Draggable>
            </div>
        } else {
            return <div></div>
        }
    }
}

const mapStateToProps = (state, props) => ({
    settings: state.user.settings,
    position: state.user.settings.position.time
})

export default connect(mapStateToProps)(withRouter(Time));