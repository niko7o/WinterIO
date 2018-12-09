import React, { Suspense, lazy, Component } from 'react';
import axios from 'axios';

import Form from './components/Form/form';
import Navbar from './components/Navbar/navbar';
import Error from './components/Error/error';
import Geolocator from './components/Geolocator/geolocator';
import Spinner from './components/Spinner/spinner';

import './styles.css';
import * as api from './constants/apiConstants';

const Weather = lazy(() => import('./components/Weather/weather'));

const buildScalableParamsQuery = (params, type) => {
  let query = '';
  params.forEach((parameter, i) => {
    i !== (params.length - 1)
    ? query += `${parameter},`
    : query += `${parameter}`
  })
  switch(type) {
    case 'geo': 
      return `${api.BASE_URL}?lat=${params[0]}&lon=${params[1]}&appid=${api.APP_ID}&${api.OPTIONS}`;
    case 'forecast': 
      return 1; //@TO-DO: forecast query when type === 'forecast'
    default:
      return `${api.BASE_URL}?q=${query}&appid=${api.APP_ID}&${api.OPTIONS}`;
  }
}

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
    loading: false,
    showError: true, // for <Error> component mounting lifecycle
    error: null,
  }

  componentDidCatch(err) {
    this.setState({ error: err })
    this.handleError(err)
  }

  changeTabState = newTab => {
    this.setState({ 
      tab: newTab 
    })
  }

  handleFormClick = () => {
    this.setState({ 
      searched: true 
    })
  }

  handleError = errorMessage => {
    this.setState({
      showError: true,
      error: errorMessage
    })
  }

  searchWeatherBy = (params, type) => {
    const apiRequestURL = buildScalableParamsQuery(params, type);
    if (params.length > 0) {
      this.setState(
        () => ({ loading: true }),
        () => {
          axios.get(apiRequestURL)
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
              loading: false,
              searched: true
            })
          }).catch((err) => {
            this.handleError('Is that even a place? Try another location!');
          })
        }
      )
    } else {
      this.handleError('Please fill both inputs before searching.');
    }
  }

  toggleErrorVisibility = () => {
    this.setState({
      showError: false
    })
  }

  render() {
    return (
      <div className="WinterIO">
          <Geolocator 
            handleError={this.handleError}
            searchWeatherBy={this.searchWeatherBy}
          />

          <Form 
            searchWeatherBy={this.searchWeatherBy}
            handleFormClick={this.handleFormClick}
            handleError={this.handleError}
          />

          { this.state.searched && (
            <Suspense fallback={<Spinner />} delay={2000} >
              { this.state.loading 
                ? <Spinner />
                : <Weather
                    temperature={this.state.temperature}
                    maxtemp={this.state.maxTemp}
                    mintemp={this.state.minTemp}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    code={this.state.code}
                    error={this.state.error}
                    loaded={!this.state.loading}
                    searched={this.state.searched} // @TO-DO: Apply CSSTransition on mount so this prop is not necessary 
                />
              }
            </Suspense>
          )}

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