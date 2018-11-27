import React, { Component } from 'react';
import './styles.css';

class Error extends Component {
    constructor(props) {
        super();
        this.state = {
            duration: 2000,
            hidden: false
        }
    }

    componentDidMount() {
        this.toggleNotification(this.state.duration);
    }

    toggleNotification = (duration) => {
        setTimeout(function() {
            this.setState({
               hidden: true 
            })
        }.bind(this), duration);
    }

    render() {
        if(!this.props.message) {
            return <React.Fragment></React.Fragment>
        }
        return (
            <div className={"Error" + (this.state.hidden ? ' hidden' : '')}>{this.props.message}</div>
        )
    }
}

export default Error;