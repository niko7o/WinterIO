import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import '../Error/error';

class Geolocator extends Component {
       
    state = {
        lat: undefined,
        lng: undefined,
        error: undefined,
        requested: false,
        loaded: false,
    }

    onLocateSuccess = position => {
        const coords = position.coords;
        this.setState({
            lat: coords.latitude,
            lng: coords.longitude,
            requested: true,
            loaded: true
        })
        console.log(this.state.lat, this.state.lng)
        this.props.getGeoWeather(this.state.lat, this.state.lng);
    }

    onLocateError = err => {
        this.setState({
            requested: true,
            loaded: true,
            error: err.message
        })
        this.props.handleError(err.message)
    }

    getLocation = () => {
        this.setState({
            requested: true,
            loaded: false
        })

        const options = {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 15000
        };

        navigator.geolocation.getCurrentPosition(this.onLocateSuccess, this.onLocateError, options);
    }

    render() {
        return (
            <React.Fragment>
                <img 
                    src="../../assets/geolocate.svg"
                    className={"Geolocator__icon" + (this.state.requested && !this.state.loaded ? ' spin' : '')}
                    alt="Geolocate me"
                    onClick={this.getLocation}
                />
                { this.state.requested && !this.state.loaded 
                    ? <div className="Geolocator__loading"></div>
                    : ''
                }
            </React.Fragment>
        )
    }
}

Geolocator.propTypes = {
    getGeoWeather: PropTypes.func,
    handleError: PropTypes.func,
}

export default Geolocator;