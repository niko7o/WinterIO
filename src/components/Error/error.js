import React, { Component } from 'react';
import './styles.css';

class Error extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {
        this.toggleError(2000)
    }

    toggleError = (duration) => {
        setTimeout(() => {
            this.props.unmount();
        }, duration);
    }

    render() {
        return (
            <div className="Error">{this.props.message}</div>
        )
    }
}

export default Error;