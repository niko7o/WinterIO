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

const buildApiSearchRequestUrl = (city, country) => `${api.BASE_URL}?q=${city},${country}&appid=${api.APP_ID}&${api.OPTIONS}`;
const buildApiGeoRequestUrl = (lat, lng) => `${api.BASE_URL}?lat=${lat}&lon=${lng}&appid=${api.APP_ID}&${api.OPTIONS}`;
const buildForecastRequestUrl = (city, country) => `${api.BASE_URL}?q=${city},${country}&appid=${api.APP_ID}&${api.OPTIONS}`;

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
    code: undefined,
    searched: false,
    loaded: false, // Defines preloader mounting/unmounting
    showError: true, // For text control on Form component
    error: null,
  }

  changeTabState = newTab => {
    this.setState({
      tab: newTab
    })
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

  getForecast = (form) => {
    const city = form.city;
    const country = form.country;
    const apiForecastRequest = buildForecastRequestUrl(city, country);

    if (city && country) {
      axios.get(apiForecastRequest)
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
            loaded: true,
            searched: true
          })
        })
        .catch(err => {
          this.handleError('Is that even a place? Try another location!');
        })
    } else {
      this.handleError('Please fill both inputs before searching..');
    }
  }

  getGeoWeather = (lat, lng) => {
    const apiGeoRequest = buildApiGeoRequestUrl(lat, lng);

    if(lat && lng) {
      axios.get(apiGeoRequest)
      .then(response => {
        const weather = response.data;
        console.log(weather);
        
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
          loaded: true,
          searched: true,
        })
      }).catch(err => {
        this.handleError(err);
      })
    }
  }

  getWeather = (form) => {
    const city = form.city;
    const country = form.country;
    const apiSearchRequest = buildApiSearchRequestUrl(city, country);

    if(city && country) {
      axios.get(apiSearchRequest)
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
            loaded: true,
            searched: true
          })
          //@TO-DO: Delete this console log. Temporary to recompile codes returned form api for weather svgs
          console.log(weather.weather[0].icon) 
        })
        .catch(err => {
            this.handleError('Is that even a place? Try another location!');
        })
    } else {
        this.handleError('Please fill both inputs before searching..');
    }
  }

  toggleErrorVisibility = () => {
    this.setState({
      showError: false
    })
  }

  render() {
    return (
      <div className="App">
          <Geolocator 
            handleError={this.handleError}
            getGeoWeather={this.getGeoWeather}
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
              unmountMe={this.toggleErrorVisibility}
            /> 
            : null 
          }

          <Navbar
            changeTabState={this.changeTabState}
            getForecast={this.getForecast}
          />
      </div>
    )
  }
}

export default App;