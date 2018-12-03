import React, { Component } from 'react';
import axios from 'axios';

// Components
import Form from './components/Form/form';
import Weather from './components/Weather/weather';
import Navbar from './components/Navbar/navbar';
import Error from './components/Error/error';
import Geolocator from './components/Geolocator/geolocator';

import './styles.css';
import * as api from './constants/apiConstants';

const buildApiRequestUrl = (city, country) => 
  `${api.BASE_URL}?q=${city},${country}&appid=${api.APP_ID}&${api.OPTIONS}`;

class App extends Component {
  state = {
    tab: 'current',
    temperature: undefined,
    maxTemp: undefined,
    minTemp: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    code: undefined, // Will determine which cute illustration to mount
    searched: false,
    loaded: false, // Defines preloader mounting/unmounting
    error: null,
    showError: true, // For text control on Form component
  }

  changeTabState = newTab => {
    this.setState({
      tab: newTab
    })
  }

  componentDidUpdate() {
    console.log(this.state.tab)
  }

  handleFormClick = (e) => {
    this.setState({
      searched: true
    })
  }

  handleError = (errorMessage) => {
    this.setState({
      showError: true,
      error: errorMessage
    })
  }

  increaseTime = (multiplier) => {
    this.setState(function (previousState) {
      return {
        time: previousState.time + 1
      };
    });
  }

  getWeather = (form) => {
    const city = form.city;
    const country = form.country;
    const apiRequest = buildApiRequestUrl(city, country);

    if(city && country) {
      axios.get(apiRequest)
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
            code: weather.weather[0].icon,
            error: null,
            showError: true,
            loaded: true
          })
          console.log(weather.weather[0].icon) //@TO-DO: Delete this. Temporary to recompile codes returned form api for weather svgs
        })
        .catch(err => {
            this.handleError('Is that even a place? Try another location!');
        })
    } else {
        this.handleError('Please fill both inputs before searching..');
    }
  }

  unmountErrorNotification = () => {
    this.setState({
      showError: false
    })
  }

  render() {
    return (
      <div className="App">
          <Geolocator 
            handleError={this.handleError}
          />

          <Form 
            loadWeather={this.getWeather} 
            handleFormClick={this.handleFormClick}
            handleError={this.handleError}
          />

          { this.state.searched && this.state.loaded ?
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
          : null }

          { this.state.showError && this.state.error ?
            <Error 
              message={this.state.error} 
              unmountMe={this.unmountErrorNotification}
            /> 
            : null 
          }

          <Navbar
            changeTabState={this.changeTabState}
          />
      </div>
    )
  }
}

export default App;