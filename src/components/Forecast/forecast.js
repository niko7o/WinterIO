import React, { Component } from 'react';
import './styles.css';

class Forecast extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="Forecast">
                    <div className="loader"></div>
                </div>
            </React.Fragment>
        );
    }
}

export default Forecast;