import React, { Component } from 'react';
import './form.css';

class Form extends Component {
    render() {
        return (
            <form className="Form" onSubmit={this.props.loadWeather}>
                <input className="Form__input" type="text" name="city" placeholder="City..." />
                <input className="Form__input" type="text" name="country" placeholder="Country..." />
                <button className="Form__submit">
                    { this.props.searched ? "Search other places" : "What's the weather?" }
                </button>
            </form>
        )
    }
}

export default Form;