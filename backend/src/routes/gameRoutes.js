var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//Schema
var Game = require('../models/Game');
var User = require('../models/User');

router.post('/leave/:gameId', function(req, res){
  var _id = req.params.gameId;
  var userId = req.body.userId;
  console.log("userId", userId)
  Game.findByIdAndUpdate(_id, {gameStatus: 3}, async function(error, updatedGame){
    io.to(_id).emit("gameUpdate", updatedGame);
    await User.findByIdAndUpdate(userId,{
      gameId: "not_set",
      inGame: false
    })
    return res.send({error:error, updatedGame:updatedGame})
  })
});

// create a new game
router.post('/', async function (req, res) {
  var userId = req.body.userId;
  var answer = req.body.answer;
  // new game data
  var newGameId = ObjectID();
  var matched = false;
  var guesserId = false;
  // check players waiting to join
  if (guesserWaitingList[0]){
    matched = true;
    var guesser = guesserWaitingList[0];
    await User.findByIdAndUpdate(guesser.userId, {
      gameId: newGameId.toString(),
      inGame: true
    })
    guesserWaitingList.splice(0,1);
    guesserId = guesser.userId;
  }
  // update user
  await User.findByIdAndUpdate(userId,{
    gameId: newGameId,
    inGame: true
  })
  // create new game
  var newGame = new Game({
  	_id: newGameId,
  	answer: answer,
  	guess: "",
  	hinter: userId,
    guesser: guesserId || "not_set",
  	gameStatus: (guesserId? 1: 0),
  	onQuestion: 0,
  	questionStatus: 0,
    questions:[]
  });
  newGame.save(function (error_game, game) {
    // if error
	  if (error_game || error_game){
	  	return res.send({
	  		result: false, 
	  		error: error_game
	  	});
	  }else{
      // if not matched
      if (!matched) {
        hinterWaitingList.push(game);
      // if matched
      }else{
        io.to(guesser.socketId).emit("match", game)
        // guesser should join the game room after receiving this;
      }
      // hinter should join the game after receiving this;
	  	return res.send({
	  		result: true, 
	  		game: game
	  	})
	  }
	})
});

// update game
router.put('/:gameId', function(req, res){
	var _id = req.params.gameId;
  var updateContent = req.body.updateContent;
  Game.findByIdAndUpdate(_id, updateContent, function(error, updatedGame){
    io.to(_id).emit("gameUpdate", updateContent);
    return res.send({error:error, updatedGame:updatedGame})
  })
});

// find game information
router.get('/:gameId', function(req, res){
  var _id = req.params.gameId;
  Game.findById(_id, function (err, game) {
    return res.send({
      error:err,
      game:game
    })
  });
})

module.exports = router;