import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'current'
        }
    }

    changeTabOnClick = (clickedTab) => {
        this.setState({ tab: clickedTab })
        this.props.changeTabState(clickedTab);
    }

    render() {
        return (
            <div className="Navbar">
                <button className={"Navbar__tab" + (this.state.tab === 'current' ? ' active' : '')} 
                        onClick={() => this.changeTabOnClick('current')}>
                        current
                </button>

                <button className={"Navbar__tab" + (this.state.tab === 'forecast' ? ' active' : '')} 
                        onClick={() => this.changeTabOnClick('forecast')}>
                        forecast
                </button>
            </div>
        )
    }
}

Navbar.propTypes = {
    changeTabState: PropTypes.func,
}

export default Navbar;