import React, { Component } from 'react';
import './../../stylesheets/App.css';
import Question from './Question';
import QuestionList from './QuestionList';
import AskQuestion from './AskQuestion';
import Waiting from './Waiting';
import Guess from './Guess';
import Result from './Result';
import LeaveGame from './LeaveGame';
import axios  from 'axios';
const maxQuestion = 20;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:this.props.user,
      mode: "ask",
      encounterData:{
        name: "",
        image: ""
      }
    }
  }
  componentDidMount = ()=>{
    this.getUserdataOfTheOtherUser()
  }
  componentWillMount = ()=>{
    this.checkIfReachMaxQuestion()
  }
  componentDidUpdate = ()=>{
    this.checkIfReachMaxQuestion()
  }
  getUserdataOfTheOtherUser = ()=>{
    var encounterId
    if (this.iAmHinter()) {
      encounterId = this.props.game.guesser;
    }else{
      encounterId = this.props.game.hinter;
    }
    axios.get(this.props.apiUrl + '/user/' + encounterId)
    .then((response)=>{
      this.setState({encounterData: response.data.user})
    })
  }
  checkIfReachMaxQuestion = ()=>{
    if (this.props.game.questions.length >= maxQuestion && this.props.game.questionStatus === 0 && this.state.mode === 'ask') {
      this.setState({mode:"guess"});
    }
  }
  iAmHinter = ()=>{
    return this.props.game.hinter === this.state.user._id;
  }
  isQuestioning = ()=>{
    return this.props.game.questionStatus === 0;
  }
  answerQuestion = (answer)=>{
    var game = this.props.game;
    game.questions[game.questions.length - 1]['answer'] = answer;
    game.questionStatus = 0;
    this.sendGameUpdate(game);
  }
  sendQuestion = (question)=>{
    var game = this.props.game;
    game.questions.push({content: question})
    game.questionStatus = 1;
    this.sendGameUpdate(game);
  }
  guessAnswer = (guess)=>{
    console.log("123");
    var game = this.props.game;
    game.guess = guess;
    game.gameStatus = 2;
    this.sendGameUpdate(game);
  }
  backToAsk = ()=>{
    this.setState({ mode: "ask" })
  }
  goGuess = ()=>{
    this.setState({ mode: "guess" })
  }
  sendGameUpdate = (game)=>{
    axios.put(this.props.apiUrl + '/game/' + game._id, {updateContent: game})
    .then((response)=>{})
  }
  render() {
    var questions = this.props.game.questions;
    return (
      <header className="App-header">
        {this.props.game.gameStatus === 1?
          <div>
            {this.iAmHinter() && !this.isQuestioning()?
              <Question 
                number={questions.length} 
                content={questions[questions.length-1]['content']}
                answerQuestion={this.answerQuestion}
              />
            :null}
            {!this.iAmHinter() && this.isQuestioning() && this.state.mode === 'ask'?
              <AskQuestion 
                number={questions.length+1} 
                sendQuestion={this.sendQuestion}
                goGuess={this.goGuess}
              />
            :null}  
            {this.iAmHinter() && this.isQuestioning()?
              <Waiting/>
            :null}
            {!this.iAmHinter() && !this.isQuestioning()?
              <Waiting/>
            :null}
            {!this.iAmHinter() && this.isQuestioning() && this.state.mode === 'guess'?
              <Guess
                guessAnswer={this.guessAnswer}
                backToAsk={this.backToAsk}
                canGoGoBackToAsk={questions.length < maxQuestion}
              />
            :null}
            <QuestionList 
              questions={this.props.game.questions}
            />
          </div>
        :null}
        {this.props.game.gameStatus >= 2?
          <Result
            answer={this.props.game.answer}
            guess={this.props.game.guess}
            gameStatus={this.props.game.gameStatus}
          />
        :null}
        <LeaveGame leaveGame={this.props.leaveGame}/>
      </header>
    );
  }
}

export default Game;
