import React, { Component } from 'react';
import './../../stylesheets/App.css';

class MainComponent extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	question: ""
	  };
	}
  render() {
    return (
    	<div className="game-component-container">
        <p className="App-subtitle">
          Wait for the other player to make next move..
        </p>
      </div>
    );
  }
}

export default MainComponent;
