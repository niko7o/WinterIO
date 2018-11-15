import React, { Component } from 'react';
import Form from './components/Form/form';
import Weather from './components/Weather/weather';
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
    error: undefined,
    firstSearchDone: undefined
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const res = await api_call.json();
        
    if (city && country) {
      this.setState({
        temperature: res.main.temp,
        maxTemp: res.main.temp_max,
        minTemp: res.main.temp_min,
        city: res.name,
        country: res.sys.country,
        humidity: res.main.humidity,
        description: res.weather[0].description,
        error: "",
        firstSearchDone: true
      })
    } else {
      this.setState({ 
        error: "Please input search values..." 
      })
    }

    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} />
        <Weather 
          temperature={this.state.temperature}
          maxtemp={this.state.maxTemp}
          mintemp={this.state.minTemp}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
          searched={this.state.firstSearchDone}
        />
      </div>
    )
  }
}

export default App;