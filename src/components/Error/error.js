import React, { Component } from 'react';
import './styles.css';

class Error extends Component {
    
    componentDidMount() {
        this.toggleError(2000)
    }

    toggleError = (duration) => {
        setTimeout(() => {
            this.props.unmountMe();
        }, duration);
    }

    render() {
        return (
            <div className="Error">
                <span>{this.props.message}</span>
            </div>
        )
    }
}

export default Error;