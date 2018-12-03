import React, { Component } from 'react';
import './styles.css';

class Notification extends Component {
    
    componentDidMount() {
        this.toggleNotification(2000)
    }

    toggleNotification = (duration) => {
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