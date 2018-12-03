import React, { Component } from 'react';
import './styles.css';
import '../Error/error';

class Geolocator extends Component {
       
    state = {
        lat: undefined,
        lng: undefined
    }


    onLocateSuccess = position => {
        const coords = position.coords;
        console.log(`Latitude : ${coords.latitude} | Longitude: ${coords.longitude}`);
        console.log(`More or less ${coords.accuracy} meters.`);

        this.setState({
            lat: coords.latitude,
            lng: coords.longitude
        })

        this.props.handleError('success')
    }

    onLocateError = err => {
        console.warn(`ERROR (${err.code}): ${err.message}`);
        this.props.handlError(err.message)
    }

    getLocation = () => {
        const options = {
            enableHighAccuracy: true,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(this.onLocateSuccess, this.onLocateError, options);
    }

    render() {
        return (
            <img 
                src="../../assets/geolocate.svg"
                className="Geolocator__icon"
                alt="Geolocate me"
                onClick={this.getLocation}
            />
        )
    }
}

export default Geolocator;