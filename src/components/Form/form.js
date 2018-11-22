import React, { Component } from 'react';
import './styles.css';

class Form extends Component {
    render() {
        return (
            <form className="weatherForm" onSubmit={this.props.loadWeather}>
                <input type="text" name="city" placeholder="City..." />
                <input type="text" name="country" placeholder="Country..." />
                <button className="weatherForm__submit">Find out weather</button>
            </form>
        )
    }
}

export default Form;