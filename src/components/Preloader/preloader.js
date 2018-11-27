import React, { Component } from 'react';
import './styles.css';

class Preloader extends Component {
    render() {
        return(
            <div className="Preloader">
                <div className="loader"></div>
            </div>
        );
    }
}

export default Preloader;