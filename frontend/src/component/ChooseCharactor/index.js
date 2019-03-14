import React, { Component } from 'react';
import './../../stylesheets/App.css';

class MainComponent extends Component {
  render() {
    return (
      <header className="App-header">
        <p className="App-title">
          Hello {this.props.user.name}
        </p>
        <p className="App-subtitle">
          Select which charactor you like to be
        </p>
        <br/>
        <button onClick={()=>this.props.chooseCharactor("guesser")} className="main-btn">
          Guesser
        </button>
        <br/>
        <button onClick={()=>this.props.chooseCharactor("hinter")} className="main-btn">
          Hinter
        </button>
      </header>
    );
  }
}

export default MainComponent;
