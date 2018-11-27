import React, { Component } from 'react';
import './form.css';

class Form extends Component {
    constructor(props) {
        super();
        this.state = {
            city: '',
            country: '',
            submitted: false,
        }
    }

    handleCountryChange = (event) => {
        this.setState({
            country: event.target.value
        })
    }

    handleCityChange = (event) => {
        this.setState({
            city: event.target.value
        })
    }

    resetForm = () => {
        this.setState({
            city: '',
            country: '',
            submitted: true
        })
    }

    handleOnClickSubmit = (e) => {
        e.preventDefault();
        this.props.loadWeather(this.state);
        this.props.handleFormClick();
        this.props.handleError();
        this.resetForm();
    }

    render() {
        return (
            <form id="weatherForm" className="Form">
                <input 
                    className="Form__input"
                    type="text"
                    name="city"
                    value={this.state.city}
                    placeholder={(this.state.submitted ? 'Another city..' : 'City..')}
                    onChange={this.handleCityChange}
                />

                <input 
                    className="Form__input"
                    type="text"
                    name="country"
                    placeholder="Country..."
                    value={this.state.country}
                    onChange={this.handleCountryChange}
                />

                <button 
                    onClick={this.handleOnClickSubmit} 
                    type="submit" 
                    className="Form__submit">
                    {(this.state.submitted ? "Find another place" : 'Look up the weather')}
                </button>
            </form>
        )
    }
}

export default Form;