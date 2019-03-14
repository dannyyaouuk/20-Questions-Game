import React, { Component } from 'react';
import './../../stylesheets/App.css';
import axios  from 'axios';
import Logo from './../../images/logo.png';

const userStorageKey = "user_20qgame";

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: "",
    };
  }
  registerUser = ()=>{
    if (this.state.name.length > 0) {
    	axios.post(this.props.apiUrl + '/user', {
        name: this.state.name,
      })
      .then( (response) => {
        if (response.data.user) {
          var userData = response.data.user;
          localStorage[userStorageKey] = JSON.stringify(userData)
        }
        this.props.finishRegister(userData);
      })
      .catch( (error) =>{
        console.log(error);
      });
    }else{
      alert("Please fill in your name")
    }
  }
  render() {
    return (
			<header className="App-header">
        <img src={Logo} className="register-logo"/>
        <p className="App-title">
          Welcome
        </p>
        <p className="App-subtitle">
          Please tell me your name
        </p>
        <input 
          type="text" 
          placeHolder="Name Here"
          className="main-input" 
          value={this.state.name} 
          onChange={(event)=>{
            this.setState({name: event.target.value})
          }} 
        />
        <button onClick={this.registerUser} className="main-btn">
          START
        </button>
      </header>
    );
  }
}

export default MainComponent;
