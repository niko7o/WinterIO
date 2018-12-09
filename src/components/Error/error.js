import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

    // Apply Transitions to the Error component first to learn

    render() {
        return (
            <div className="Error">
                <span>{this.props.message}</span>
            </div>
        )
    }
}

Error.propTypes = {
    unmountMe: PropTypes.func,
    message: PropTypes.string,
}

export default Error;