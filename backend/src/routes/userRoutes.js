var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
//Schema
var User = require('../models/User');

// create a new user
router.post('/', function (req, res) {
  var name = req.body.name;
  var charactor = req.body.charactor;
  var _id = ObjectID();
  var newUser = new User({
    _id: _id,
    name: name,
    inGame: false,
    gameId: "not_set",
    charactor: charactor
  });
  newUser.save(function(error, user){
    return res.send({
      error: error, 
      user:user
    });
  })
});

router.put('/:userId', function(req, res){
	var _id = req.params.userId;
  var updateContent = req.body.updateContent;
  User.findByIdAndUpdate(_id, updateContent, function(error, updatedUser){
    return res.send({error:error, updatedUser:updatedUser})
  })
});

router.get('/waiting', function(req,res){
  return res.send({guesserWaitingList: guesserWaitingList, hinterWaitingList:hinterWaitingList});
})

router.get('/:userId', function(req, res){
  var _id = req.params.userId;
  User.findById( _id, function(error, user){
    return res.send({error:error, user:user})
  })
});



module.exports = router;