import React, { Component } from 'react';
import './styles.css';

class Notification extends Component {
    constructor(props, type) {
        super();
        this.type = type;
    }

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
            <div className={"Notification" + (this.props.type ? ` ${this.props.type}` : '')}>
                <span>{this.props.message}</span>
            </div>
        )
    }
}

export default Notification;