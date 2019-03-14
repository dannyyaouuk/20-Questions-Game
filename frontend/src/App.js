import React, { Component } from 'react';
import './stylesheets/App.css';
import axios  from 'axios';

import Game from './component/Game/';
import Register from './component/Register/';
import ChooseCharactor from './component/ChooseCharactor/';
import WaitingForJoin from './component/WaitingForJoin';
import OpenGame from './component/OpenGame';
import LogoBar from './component/LogoBar';
import io from 'socket.io-client';
const charactors = [
  require("./images/c1.png"),
  require("./images/c2.png"),
  require("./images/c3.png"),
  require("./images/c4.png")
];

const apiUrl = "http://localhost:6200";
const userStorageKey = "user_20qgame";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: -1, // 0 --> user register , 1 --> ready to start, 2 --> finding room, 2.5 --> create room, 3 --> in room
      user: {},
      answer: "Politics"
    };
  }
  componentWillMount = ()=>{
    this.connectToSocketServer();
  }
  connectToSocketServer = ()=>{
    const socket = io(apiUrl);
    this.setState({
      socket: socket
    },()=>{
      this.state.socket.on('connect', () => {
        console.log("socket.id", socket.id)
        this.checkUserData();
      });
      this.state.socket.on('gameUpdate', (game)=>{
        console.log("gameUpdate", game)
        this.setState({game: game, stage:3});
      })
      this.state.socket.on('match', (game)=>{
        console.log("match", game)
        this.state.socket.emit("join", {game: game._id});
        this.setState({game: game, stage:3})
      })
    })
  }
  checkUserData = ()=>{
    var userDataInLocationStorage = localStorage[userStorageKey];
    if (userDataInLocationStorage) {
      var user = JSON.parse(userDataInLocationStorage);
      console.log(apiUrl + "/user/"+user._id);
      var userData;
      axios.get(apiUrl + "/user/"+user._id)
      .then( (response) => {
        if(!response.data.user){
          this.setState({stage: 0});
        }else if(response.data.user.inGame){
          userData = response.data.user;
          axios.get(apiUrl + "/game/"+userData.gameId)
          .then( (response)=>{
            this.state.socket.emit("join", {game: response.data.game._id})
            console.log("init: game:", response.data.game)
            this.setState({
              game: response.data.game,
              user: userData,
              stage: 3
            })
          })
          .catch( (error) =>{
            console.log(error);
          });
        }else{
          userData = response.data.user;
          this.setUserData(userData)
        }
      })
      .catch( (error) =>{
        console.log(error);
      });
    }else{
      this.setState({stage: 0});
    }
  }
  setUserData = (userData)=>{
    this.setState({
      stage: 1,
      user: userData
    })
  }
  chooseCharactor = (charactor) =>{
    if (charactor === 'hinter') {
      this.setState({stage: 2.5})
    }else if(charactor === 'guesser'){
      this.findGame();
    }
  }
  findGame = ()=>{
    this.state.socket.emit("findGame", {userId: this.state.user._id});
    this.setState({
      stage: 2
    })
  }
  createGame = (answer)=>{
    console.log("123");
    axios.post(apiUrl + '/game', {
      userId: this.state.user._id,
      answer: answer
    })
    .then( (response) => {
      console.log(response);
      if (response.data.game) {
        var game = response.data.game;
        console.log(game);
        this.state.socket.emit("join", {game: game._id})
        this.setState({
          stage: 3,
          game:game
        });
      };
    })
    .catch( (error) =>{
      console.log(error);
    });
  }
  leaveGame = ()=>{
    this.state.socket.emit("leave", {game: this.state.game._id});
    axios.post(apiUrl + "/game/leave/"+this.state.game._id, {
      userId: this.state.user._id
    })
    .then((response)=>{
      var user = this.state.user;
      user['inGame'] = false;
      user['gameId'] = 'not_set';
      this.setState({
        stage: 1,
        game: {},
        user: user
      })
    })
  }
  renderComponent = ()=>{
    switch(this.state.stage) {
      case 0:
        return (          
          <Register 
            finishRegister={this.setUserData}
            apiUrl={apiUrl}
            charactors={charactors}
          />
         )
        break;
      case 1:
        return (          
          <ChooseCharactor 
            user={this.state.user}
            chooseCharactor={this.chooseCharactor}
          />
         )
        break;
      case 2:
        return (<WaitingForJoin/>)
        break;
      case 2.5:
        return (          
          <OpenGame 
            createGame={this.createGame}
          />
         )
        break;
      case 3:
        if (this.state.game.gameStatus === 0) {
          return (<WaitingForJoin/>)
        }else{
          return (          
            <Game 
              user={this.state.user}
              apiUrl={apiUrl}
              game={this.state.game}
              socket={this.state.socket}
              leaveGame={this.leaveGame}
            />
           )
        }
        break;
      default:
        return (
          <p>Loading...</p>
        )
    }
  }
  render() {
    return (
      <div className="App">
        <LogoBar/>
        {this.renderComponent()}
        <div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"           title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"           title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </div>
    );
  }
}

export default App;
