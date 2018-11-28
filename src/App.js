import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form/form';
import Weather from './components/Weather/weather';
import Navbar from './components/Navbar/navbar';
import Error from './components/Error/error';
import './styles.css';
import * as api from './constants/apiConstants';

const buildApiRequestUrl = (city, country) => 
  `${api.BASE_URL}?q=${city},${country}&appid=${api.APP_ID}&${api.OPTIONS}`;

class App extends Component {
  state = {
    time: Date.now(),
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
          console.log(weather.weather[0].icon) // To recompile codes for stateless icon components
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
      /* Depending on this.state.time, change the background of the app dynamically*/
      <div className="App">
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

          <Navbar/>
      </div>
    )
  }
}

export default App;