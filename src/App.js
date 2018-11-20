import React, { Component } from 'react';
import axios from 'axios';
import Form from './components/Form/form';
import Weather from './components/Weather/weather';

const API_KEY = "8d2de98e089f1c28e1a22fc19a24ef04";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country) {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        .then(response => {
          const weather = response.data;
          console.log(weather)
          this.setState({
            temperature: weather.main.temp,
            city: weather.name,
            country: weather.sys.country,
            humidity: weather.main.humidity,
            description: weather.weather[0].description,
            code: weather.weather[0],
            error: ""
          })
        })
        .catch(err => {
          console.error(err);
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
        <Form loadWeather={this.getWeather} />
        <Weather 
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default App;