import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Signup from './components/user/Signup';
import Login from './components/user/Login';
import EmailVerification from './components/user/EmailVerification';
import About from './About';
import Settings from './components/Settings';
import Nav from './components/Nav';
import YourWhether from './components/YourWhether';
import Home from './components/Home';
import WebcamList from './components/WebcamList';
import './App.css';

const ConnectedSwitch = connect(state => ({
  location: state.router.location
}))(Switch)

class App extends Component {
  constructor(props) {
    super(props)

    this.showSidebar = this.showSidebar.bind(this)
  }

  showSidebar() {
    if (this.props.isLoggedIn) {
      return <Nav />
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="App-container">
        <div className="mobile-only">Unfortunately, this app is only for mobile devices. Please press shift+ctrl+i (windows) or option+command+i (mac) to go into developer mode and enter mobile view. You can also resize the window to mock a smartphone.</div>
        <div className="App">
          {this.showSidebar()}
          <ConnectedSwitch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <Route path="/email-verification" exact component={EmailVerification} />
            <Route path="/about" exact component={About} />
            <Route path="/yourwhether" exact render={() => (
              this.props.isLoggedIn ? <YourWhether /> :
                <Redirect to="/login" />
            )} />
            <Route path="/home" exact render={() => (
              this.props.isLoggedIn ? <Home /> :
                <Redirect to="/login" />
            )} />
            <Route path="/settings" exact render={() => (
              this.props.isLoggedIn ? <Settings /> :
                <Redirect to="/login" />
            )} />
            <Route path="/webcams" exact render={() => (
              this.props.isLoggedIn ? <WebcamList /> :
                <Redirect to="/login" />
            )} />
          </ConnectedSwitch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(App);
