import React, { Component } from 'react';
import './../../stylesheets/App.css';
import Logo from './../../images/logo.png';

class MainComponent extends Component {
  render() {
    return (
			<div 
				className="logo-container"
			>
        <img 
        	src={Logo} 
        	alt="logo" 
        	className="logo"
       	/>
      </div>
    );
  }
}

export default MainComponent;
