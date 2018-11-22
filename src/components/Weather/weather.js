import React, { Component } from 'react';
import './weather.css';

class Weather extends Component {
    render() {
        return (
            <div className={"Weather" + (this.props.searched ? " found" : '')}>
                <div className="Weather__info">
                { 
                    this.props.country && this.props.city && 
                    <div className="weather__location">
                        <h1>{this.props.city}</h1>
                    </div> 
                }
                { 
                    this.props.description && 
                    <div className="weather__description">
                        <span>{this.props.description}</span>  
                    </div>
                }
                {
                    this.props.temperature &&
                    <div className="weather__temperature">
                        <span>{this.props.temperature}º</span>
                    </div>
                }
                { 
                    this.props.maxtemp && this.props.mintemp &&
                    <div className="weather__ranges">
                        <span className="weather_mintemp">{this.props.mintemp}º</span>
                        <span className="weather_maxtemp">{this.props.maxtemp}º</span>
                    </div>
                }
                { 
                    this.props.error && 
                    <p className="weather__error">{this.props.error}</p> 
                }
                </div>
            </div>
        )
    }
}

export default Weather;