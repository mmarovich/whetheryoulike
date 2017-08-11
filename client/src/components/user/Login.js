import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Login.css';
import store from '../../store';
import * as actions from '../../actions/index';


class Login extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.logIn = this.logIn.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);

        this.state = {
            email: '',
            password: '',
            msg: ''
        }
    }

    logIn(email, password) {
        console.log(email, password)
        return fetch('https://rocky-escarpment-61736.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => {
                if (response.status === 401 || response.status === 500) {
                    this.setState({ msg: 'Invalid Username or password'})
                }
                return response.json()
            })
            .then(user => {
                if (user.settings === undefined) {
                    store.dispatch(actions.logIn(user.email, user.status))
                    store.dispatch(actions.initialSettings())
                    return;
                } else {
                    store.dispatch(actions.logIn(user.email, user.status))
                    store.dispatch(actions.loadSettings(user.settings))
                    return;
                }
            })
            .then(data => {
                this.props.history.push('/settings')
            })
            .catch(error => console.log(error));

    }

    emailChange(e) {
        this.setState({ email: e.target.value })
    }

    passwordChange(e) {
        this.setState({ password: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        this.logIn(email, password);
    }

    render() {
        return (
            <div className="login-background">
                <div className="intro-container">
                    <div className="login-title"><h1>WhetherYouLike</h1></div>
                </div>
                <div className="login-container">
                    <form className="login" onSubmit={this.onSubmit}>
                        <h3>Log In</h3>
                        <label htmlFor="email">Email </label>
                        <input id="email" type="text" name="email"
                            onChange={this.emailChange} value={this.state.email} required /><br />
                        <label htmlFor="password">Password </label>
                        <input id="password" type="password" name="password"
                            onChange={this.passwordChange} value={this.state.password} required /><br />
                        <div className="message">{this.state.msg}</div>
                        <button className="login-button" type="Submit" value="Submit">Submit</button>
                    </form>
                    
                    <p>Need an account? <Link to="/signup">Sign Up</Link></p>
                    <p><Link to="/about">About WhetherYouLike</Link></p>
                </div>
            </div>
        )
    }
}

export default Login;