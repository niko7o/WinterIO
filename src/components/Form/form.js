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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        console.log('Form', props)
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

    resetForm() {
        this.setState({
            city: '',
            country: ''
        })
    }

    handleSubmit(event) {
        this.setState({
            submitted: true,
            city: '',
            country: '',
        })
        this.resetForm();
    }
    
    render() {
        return (
            <form id="weatherForm" className="Form" onSubmit={this.props.loadWeather}>
                <input 
                    className="Form__input"
                    type="text"
                    name="city"
                    placeholder={(this.state.submitted ? 'Another city..' : 'City..')}
                    onChange={this.handleCityChange}
                />

                <input 
                    className="Form__input"
                    type="text"
                    name="country"
                    placeholder="Country..."
                    onChange={this.handleCountryChange}
                />

                <button onClick={this.props.handleFormClick} type="submit" className="Form__submit">
                    {(this.state.submitted ? "Find another place" : 'Look up the weather')}
                </button>
            </form>
        )
    }
}

export default Form;