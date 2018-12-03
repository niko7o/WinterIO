import React, { Component } from 'react';
import './styles.css';

const navigationTabs = [
    'current', 
    'forecast', 
];

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'current'
        }
    }

    changeTabOnClick(clickedTab) {
        this.props.changeTabState(clickedTab);
    }

    render() {
        return (
            <div className="Navbar">
                { 
                    navigationTabs.map((tab, i) => 
                    <button 
                        key={i} 
                        className={"Navbar__tab" + (this.props.activeTab === tab ? ' active' : '')} 
                        onClick={this.changeTabOnClick.bind(this, tab)}
                    >
                        { tab } 
                    </button>) 
                }
            </div>
        )
    }
}

export default Navbar;