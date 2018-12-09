import React, { Component } from 'react';
import './styles.css';

class Spinner extends Component {
    render() {
        return(
            <div className="Spinner">
                <div className="loader"></div>
            </div>
        );
    }
}

export default Spinner;