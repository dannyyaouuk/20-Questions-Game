import React, { Component } from 'react';
import './../../stylesheets/App.css';

class MainComponent extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	answer:"Join"
	  };
	}
	pressStart = ()=>{
		if(this.state.answer.length > 0){
			this.props.createGame(this.state.answer)
		}else{
			alert("Please fill the word to guess");
		}
	}
  render() {
    return (
			<header className="App-header">
			  <p className="App-title">
			    Please set up the word to guess
			  </p>
			  <input 
			    type="text" 
			    className="main-input" 
			    value={this.state.answer} 
			    onChange={(event)=>{
			      this.setState({answer: event.target.value})
			    }} 
			  />
			  <button onClick={this.pressStart} className="main-btn">
			    START
			  </button>
			</header>
    );
  }
}

export default MainComponent;
