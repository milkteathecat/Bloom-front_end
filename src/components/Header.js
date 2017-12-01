import React from 'react';
import logo from '../assets/images/logo.svg';
import { PropTypes } from 'prop-types';

export class Header extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
    }
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Around</h1>
            </header>
        );
    }
}