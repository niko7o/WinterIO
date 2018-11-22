import React, { Component } from 'react';
import './styles.css';

class Navbar extends Component {
    render() {
        return (
            <div className="Navbar">
                <div className="Navbar__tab active">Current</div>
                <div className="Navbar__tab">Forecast</div>
                <div className="Navbar__tab">Find me</div>
            </div>
        )
    }
}

export default Navbar;