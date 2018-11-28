import React, { Component } from 'react';
import './styles.css';

const navigationTabs = [
    'current', 
    'forecast', 
    'find me',
];
class Navbar extends Component {
    state = { 
        activeTab: 'current' 
    }

    changeTabOnClick(clickedTab) {
        this.setState({ activeTab: clickedTab }) 
    }

    render() {
        return (
            <div className="Navbar">
                { 
                    navigationTabs.map((tab, i) => 
                    <button key={i} className={"Navbar__tab" + (this.state.activeTab === tab ? ' active' : '')} onClick={this.changeTabOnClick.bind(this, tab)}>
                        { tab } 
                    </button>) 
                }
            </div>
        )
    }
}

export default Navbar;