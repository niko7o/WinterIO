import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const navigationTabs = [
    'current', 
    'forecast',
];

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightedTab : 'current'
        }
    }

    changeTabOnClick(clickedTab) {
        this.setState({ highlightedTab : clickedTab })
        this.props.changeTabState(clickedTab);
        console.log(this.state.highlightedTab )
    }

    render() {
        return (
            <div className="Navbar">
                { 
                    navigationTabs.map((tab, i) => 
                    <button 
                        key={i} 
                        className={"Navbar__tab" + (this.state.activeTab === tab ? ' active' : '')} 
                        onClick={this.changeTabOnClick.bind(this, tab)}
                    >
                        { tab } 
                    </button>) 
                }
            </div>
        )
    }
}

Navbar.propTypes = {
    changeTabState: PropTypes.func,
}

export default Navbar;