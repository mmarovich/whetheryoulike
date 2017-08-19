import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import TiThMenu from 'react-icons/lib/ti/th-menu'


import '../styles/Nav.css';

class Nav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorOrigin: {
                horizontal: 'right',
                vertical: 'bottom',
            },
            targetOrigin: {
                horizontal: 'left',
                vertical: 'top',
            },
        };
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div className="menu-container">
                <TiThMenu className="menu-icon" onTouchTap={this.handleTouchTap} />
                <Popover
                    style={{backgroundColor: 'white'}}
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu>
                        <MenuItem onTouchTap={this.handleRequestClose}><Link to="/settings">Settings</Link></MenuItem>
                        <MenuItem onTouchTap={this.handleRequestClose}><Link to="/yourwhether">Change Positions</Link></MenuItem>
                        <MenuItem onTouchTap={this.handleRequestClose}><Link to="/home">Preview</Link></MenuItem>
                        <MenuItem onTouchTap={this.handleRequestClose}><Link to="/about">About</Link></MenuItem>
                    </Menu>
                </Popover>
            </div>
        );
    }
}

export default Nav;