import React, { Component } from 'react';
import * as weather from '../../constants/weatherConstants';
import './styles.css';
import '../Error/error';

/*
 * TO-DO: ask Cristian why I had to use {} to read the prop given to stateless component
 */
const WeatherCodeIcon = ({code}) => <img className="weather_icon floating" src={weather.CODE_ICONS[code]} alt="icon"/>

class Weather extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div className={"Weather" + (this.props.loaded && this.props.description ? " found" : '')}>
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
                    <WeatherCodeIcon code={this.props.code}></WeatherCodeIcon>
                }
                { 
                    this.props.maxtemp && this.props.mintemp &&
                    <div className="weather__ranges">
                        <span className="weather_mintemp">{this.props.mintemp}º</span>
                        <span className="weather_maxtemp">{this.props.maxtemp}º</span>
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default Weather;