import React, { Component } from 'react';
import './form.css';
import './styles.css';

class Form extends Component {
    constructor(props) {
        super();
        this.state = {
            city: '',
            country: '',
            visible: true,
            submitted: false,
            buttonText: "What's the weather?"
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    handleCountryChange(event) {
        this.setState({
            country: event.target.value
        })
    }

    handleCityChange(event) {
        this.setState({
            city: event.target.value
        })
    }

    handleSubmit(event) {
        this.setState({
            submitted: true,
            city: '',
            country: '',
            buttonText: "Search another place"
        })
    }
    
    render() {
        return (
            <form id="weatherForm" className="Form" onSubmit={this.props.loadWeather}>
                <input 
                    className="Form__input"
                    type="text"
                    name="city"
                    placeholder="City..."
                    onChange={this.handleCityChange}
                    required
                />

                <input 
                    className="Form__input"
                    type="text"
                    name="country"
                    placeholder="Country..."
                    onChange={this.handleCountryChange}
                    required
                />

                <button onClick={this.handleSubmit} type="submit" className="Form__submit">{this.state.buttonText}</button>
            </form>
        )
    }
}

export default Form;