import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './form.css';

class Form extends Component {
    constructor(props) {
        super(props);
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

    handleOnClickSubmit = (e) => {
        e.preventDefault();
        this.props.loadWeather(this.state);
        this.props.handleFormClick();
        this.resetForm();
    }

    resetForm = () => {
        this.setState({
            city: '',
            country: '',
            submitted: true
        })
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
                    autoFocus
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

Form.propTypes = {
    loadWeather: PropTypes.func,
    handleFormClick: PropTypes.func
}

export default Form;