import React, { Component } from 'react';
import './../../stylesheets/App.css';

class MainComponent extends Component {

  render() {
  	var qList = [];
  	qList = qList.concat(this.props.questions);
  	qList = qList.reverse();
    return (
    	<div>
				{this.props.questions.length>0?<p className="App-subtitle game-question-title">
	        Question History
	      </p>:null}
	      <ul className="game-question-history-container">
	        {qList.map((question, index)=>{
	        	if ("answer" in question) {
		        	return(
				        <li key={"question-list-" + index}>
				          <p className="game-question-history-title">{question.content}</p>
				          {question.answer?
				          	<p className="game-question-history-answer positive">Yes</p>:
				          	<p className="game-question-history-answer negetive">No</p>
				          }
				        </li>
			        )
		        }else{
		        	return null;
		        }
		      })}
	      </ul>
      </div>
    );
  }
}

export default MainComponent;
