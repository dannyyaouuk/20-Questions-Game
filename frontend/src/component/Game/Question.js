import React, { Component } from 'react';
import './../../stylesheets/App.css';

class MainComponent extends Component {
  render() {
    return (
    	<div>
				<p className="App-title">
		      Question {this.props.number}:
		    </p>
		    <p className="App-subtitle">
		      {this.props.content}
		    </p>
		    <div className="game-btn-container">
		      <button onClick={()=>this.props.answerQuestion(true)} className="main-btn game possitive">
		        YES
		      </button>
		      <button onClick={()=>this.props.answerQuestion(false)} className="main-btn game negetive">
		        NO
		      </button>
		    </div>
	    </div>
    );
  }
}

export default MainComponent;
