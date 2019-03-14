var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var Game = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  answer: {
    type: String
  },
  guess: {
    type: String
  },
  guesser: {
    type: String
  },
  hinter: {
    type: String
  },
  gameStatus:{
  	// 0 wait for another player
  	// 1 in ask/hint stage
  	// 2 show the result
  	// 3 canceled
  	type: Number
  },
  questionStatus:{
  	// 0 wait for the question
  	// 1 wait for the answer
  	type: Number
  },
  questions: {
    type: Array
  }

},{
    collection: 'Game'
});

module.exports = mongoose.model('Game', Game);