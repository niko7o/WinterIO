import React, { Component } from 'react';
import axios from 'axios';

import Form from './components/Form/form';
import Weather from './components/Weather/weather';
import Navbar from './components/Navbar/navbar';

import './styles.css';

const API_KEY = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends Component {
  state = {
    temperature: undefined,
    maxTemp: undefined,
    minTemp: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    code: undefined,
    error: undefined,
    loaded: false,
    searched: false
  }

  handleFormClick = (e) => {
    this.setState({
      searched: true
    })
  }

  getWeather = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        .then(response => {
          const weather = response.data;
          this.setState({
            temperature: weather.main.temp,
            maxTemp: weather.main.temp_max,
            minTemp: weather.main.temp_min,
            city: weather.name,
            country: weather.sys.country,
            humidity: weather.main.humidity,
            description: weather.weather[0].description,
            code: weather.weather[0],
            error: "",
            loaded: true
          })
          console.log(response)
        })
        .catch(err => {
          this.setState({
            error: 'Weather not found'
          })
        })
    } else {
      this.setState({
        error: "Please fill both inputs before searching for the weather.."
      })
    }
  }

  render() {
    return (
      <div className="App">
          <Form 
            loadWeather={this.getWeather} 
            handleFormClick={this.handleFormClick}
          />
          <Weather
            temperature={this.state.temperature}
            maxtemp={this.state.maxTemp}
            mintemp={this.state.minTemp}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            code={this.state.code}
            error={this.state.error}
            searched={this.state.searched}
          />
          <Navbar/>
      </div>
    )
  }
}

export default App;