import React, { Component } from 'react';
import './../../stylesheets/App.css';

class MainComponent extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	guess: ""
	  };
	}
  render() {
    return (
    	<div className="game-component-container">
        <p className="App-subtitle">
          Guess the answer
        </p>
        <input 
          type="text" 
          className="main-input game-question-input" 
          value={this.state.guess} 
          onChange={(event)=>{
            this.setState({guess: event.target.value})
          }} 
        />
        <button onClick={()=>this.props.guessAnswer(this.state.guess)} className="main-btn">
          Guess
        </button>
        <br/>
        {this.props.canGoGoBackToAsk?<button onClick={this.props.backToAsk} className="main-btn">
          Back to Ask
        </button>:null}
        <br/><br/>
      </div>
    );
  }
}

export default MainComponent;
