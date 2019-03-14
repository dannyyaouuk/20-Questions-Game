import React, { Component } from 'react';
import './../../stylesheets/App.css';

class MainComponent extends Component {
  leaveGame = ()=>{
  	var leaving = window.confirm("Are you sure leaving?");
  	if (leaving) {
  		this.props.leaveGame();
  	}
  }
  render() {
    return (
			<div style={{margin: "30px"}}>
        <button onClick={this.leaveGame} className="main-btn">Leave Game</button>
      </div>
    );
  }
}

export default MainComponent;
