import React, { Component } from 'react';
import axios from 'axios';

import Form from './components/Form/form';
import Weather from './components/Weather/weather';
import Navbar from './components/Navbar/navbar';
import Preloader from './components/Preloader/preloader';
import Error from './components/Error/error';

import './styles.css';
import * as api from './constants/apiConstants';

const buildApiRequestUrl = (city, country) => 
  `${api.BASE_URL}?q=${city},${country}&appid=${api.APP_ID}&${api.OPTIONS}`;

class App extends Component {
  state = {
    temperature: undefined,
    maxTemp: undefined,
    minTemp: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    code: undefined, // Will determine which cute illustration to mount
    error: null,
    loaded: false, // Defines preloader mounting/unmounting
    searched: false // For text control on Form component
  }

  handleFormClick = (e) => {
    this.setState({
      searched: true
    })
  }

  handleError = (errorMessage) => {
    this.setState({
      error: errorMessage
    })
  }

  getWeather = (form) => {
    const city = form.city;
    const country = form.country;
    const apiRequestUrl = buildApiRequestUrl(city, country);

    if(city && country) {
      axios.get(apiRequestUrl)
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
            error: null,
            loaded: true
          })
        })
        .catch(err => {
            this.handleError('Weather has not been found. Try another place!');
        })
    } else {
        this.handleError('Please fill both inputs before searching for the weather..');
    }
  }

  render() {
    return (
      <div className="App">
          <Form 
            loadWeather={this.getWeather} 
            handleFormClick={this.handleFormClick}
            handleError={this.handleError}
          />
          {this.state.searched && (
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
              loaded={this.state.loaded}
              searched={this.state.searched} // @TO-DO: Apply CSSTransition on mount so this prop is not necessary 
            />
          )}
          {this.state.error && (
            <Error 
              message={this.state.error} 
            />
          )}
          <Navbar/>
      </div>
    )
  }
}

export default App;