import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as weather from '../../constants/weatherConstants';

import './styles.css';
import '../Error/error';

const WeatherCodeIcon = ({code}) =>
    <img 
        className="Weather__icon floating" 
        src={weather.CODE_ICONS_SVG[code]} 
        alt="icon"
    />

class Weather extends Component {
    render() {
        return (
            <div className={"Weather" + (this.props.loaded && this.props.description ? " found" : '')}>
                <div className="Weather__info">
                { 
                    this.props.country && this.props.city && 
                    <div className="Weather__location">
                        <h1>{this.props.city}</h1>
                    </div> 
                }
                { 
                    this.props.description && 
                    <div className="Weather__description">
                        <span>{this.props.description}</span>  
                    </div>
                }
                {
                    this.props.temperature &&
                    <div className="Weather__temperature">
                        <span>{this.props.temperature}º</span>
                    </div>
                }
                {
                    <WeatherCodeIcon code={this.props.code} />
                }
                { 
                    this.props.maxtemp && this.props.mintemp &&
                    <div className="Weather__ranges">
                        <span className="Weather__mintemp">{this.props.mintemp}º</span>
                        <span className="Weather__maxtemp">{this.props.maxtemp}º</span>
                    </div>
                }
                </div>
            </div>
        )
    }
}

Weather.propTypes = {
    main: PropTypes.object,
    coord: PropTypes.object,
    loaded: PropTypes.bool,
    description: PropTypes.string,
    country: PropTypes.string,
    city: PropTypes.string,
    temperature: PropTypes.number,
    code: PropTypes.string,
    maxtemp: PropTypes.number,
    mintemp: PropTypes.number
}

export default Weather;