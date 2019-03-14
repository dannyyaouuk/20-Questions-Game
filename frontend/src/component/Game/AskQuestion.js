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
          Ask Question {this.props.number}:
        </p>
        <input 
          type="text" 
          className="main-input game-question-input" 
          value={this.state.question} 
          onChange={(event)=>{
            this.setState({question: event.target.value})
          }} 
        />
        <button onClick={()=>this.props.sendQuestion(this.state.question)} className="main-btn">
          Ask
        </button>
        <br/>
        <button onClick={this.props.goGuess} className="main-btn">
          Straight to Guess
        </button>
        <br/><br/>
      </div>
    );
  }
}

export default MainComponent;
