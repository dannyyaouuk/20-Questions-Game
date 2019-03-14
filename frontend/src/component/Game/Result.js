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
        <p className="App-title">
          Result:
        </p>
        {this.props.answer && this.props.guess && this.props.answer === this.props.guess?
        	<p className="App-subtitle">
	          Successful Guess!
	        </p>
          :
          null
        }
        {this.props.answer && this.props.guess && this.props.answer !== this.props.guess?
	        <p className="App-subtitle">
	          Failed Guess!
	        </p>
          :
          null
	      }
        <p className="App-subtitle">
          The answer is {this.props.answer}
        </p>
        <p className="App-subtitle">
          The guess is {this.props.guess}
        </p>
        <br/>
        {this.props.gameStatus === 3?
          <p className="App-subtitle">
            The other player has left.
          </p>
        :null}
        <button onClick={this.props.send} className="main-btn">
          OK
        </button>
        <br/><br/>
      </div>
    );
  }
}

export default MainComponent;
