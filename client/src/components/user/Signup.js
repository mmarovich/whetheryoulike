import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/Signup.css';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.checkAllFields = this.checkAllFields.bind(this)
        this.emailChange = this.emailChange.bind(this)
        this.passwordChange = this.passwordChange.bind(this)

        this.state = {
            email: '',
            password: '',
            msg: ''
        }
    }

    createNewUser(email, password) {
        return fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.msg) {
                    this.setState({ msg: data.msg })
                    return data;
                } else {
                    this.setState({ msg: '' })
                    return data;
                }
            })
            .then(data => {
                if (!data.msg) {
                    this.props.history.push('/login')
                } else {
                    return;
                }
            })
            .catch(error => console.log(error));
    }

    emailChange(e) {
        this.setState({ email: e.target.value })
        const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value)
        if (!emailTest) {
            this.setState({ msg: 'must be a valid email address'})
        } else {
            this.setState({ msg: ''})
        }
    }

    passwordChange(e) {
        this.setState({ password: e.target.value })
        const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/.test(e.target.value)
        if (!passwordTest) {
            this.setState({ msg: 'password must be at least 8 characters long, include 1 uppercase and lowercase letter, and 1 numeric digit'})
        } else {
            this.setState({ msg: ''})
        }
    }

    checkAllFields(e) {
        const usernameTest = /^[a-zA-Z0-9]{6,20}$/
        const emailTest = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const passwordTest = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/
        if (e.target.id === 'username') {
            if (usernameTest.test(e.target.value) && emailTest.test(this.state.email) && passwordTest.test(this.state.password)) {
                this.setState({ disabled: false })
            }
        }
        if (e.target.id === 'email') {
            if (usernameTest.test(this.state.username) && emailTest.test(e.target.value) && passwordTest.test(this.state.password)) {
                this.setState({ disabled: false })
            }
        }
        if (e.target.id === 'password') {
            if (usernameTest.test(this.state.username) && emailTest.test(this.state.email) && passwordTest.test(e.target.value)) {
                this.setState({ disabled: false })
            }
        } else {
            this.setState({ disabled: true })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        this.createNewUser(email, password);
    }


    render() {
        return (
            <div className="signup-background">
                <div className="intro-container">
                    <div className="signup-title"><h1>WhetherYouLike</h1></div>
                    <div className="motto"><h4>your weather or not, however you like</h4></div>
                </div>
                <div className="signup-container">
                    <form className="createAccount" onSubmit={this.onSubmit} onChange={this.checkAllFields}>
                        <h3>Sign Up</h3>
                        <label htmlFor="email">Email </label>
                        <input id="email" type="text" name="email"
                            onChange={this.emailChange} value={this.state.email} required /><br />
                        <label htmlFor="password">Password </label>
                        <input id="password" type="password" name="password"
                            onChange={this.passwordChange} value={this.state.password} required /><br />
                        <div className="message">{this.state.msg}</div>
                        <button className="signup-button" type="submit" value="Submit">Sign Up</button>
                    </form>
                    <p>Already have an account? <Link to="/login">Log in here</Link></p>
                    <p><Link to="/about">About WhetherYouLike</Link></p>
                </div>
            </div>
        )
    }
}

export default SignUp;