import React, { Component } from 'react';
import './styles.css';
import '../Error/error';
//import Preloader from '../Preloader/preloader';

const Sun = () => <img className="Weather_sun floating" src="./sun.png" alt="Sun"/>;

/*
 * TO-DO: refactor stateless components to object literals
 */

// const drawings = {
//     sun: '<img className="Weather_sun floating" src="./sun.png" alt="Sun"/>',
//     clouds: '',
//     rain: ''
// }

class Weather extends Component {
    constructor(props) {
        super();
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
                    this.props.code &&
                    <Sun></Sun>
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