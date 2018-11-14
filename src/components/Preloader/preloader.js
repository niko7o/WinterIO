import React, { Component } from 'react';
import './styles.css';

class Preloader extends Component {
    render() {
        return(
            <div className="Preloader">
                <div className="loader">Loading...</div>
            </div>
        );
    }
}

export default Preloader;