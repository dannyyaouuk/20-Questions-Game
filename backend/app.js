//Libraries
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var Game = require('./src/models/Game.js');
//server configuration
var port = 6200;

// waiting list for games
guesserWaitingList = [];
hinterWaitingList = [];
// socket
io = require('socket.io')(http);
io.on('connection', function(socket){
  socket.on('join', function(data){
    var game = data.game;
  	socket.join(game);
  });
  socket.on('leave', function(data){
    var game = data.game;
  	socket.leave(game);
  });
  socket.on('disconnect', function(){
    console.log(socket.id, "leave");
    for (var i = 0; i < guesserWaitingList.length; i++) {
      if(guesserWaitingList[i]['socketId'] === socket.id){
        guesserWaitingList.splice(i,1);
        break;
      }
    }
  })
  // find a game to join
  socket.on('findGame', function(data){
    // if there's game waiting to be joined
    if (hinterWaitingList[0]) {
      var gameToJoin = hinterWaitingList[0];
      Game.update(
       {_id: gameToJoin['_id']}, {$set: {
         guesser: String(data.userId), 
         gameStatus: 1
       }}, function(error, updatedInfo){
        Game.findOne({_id: gameToJoin['_id']}, function(error, updatedGame){
          console.log(error, updatedGame);
          if (!error) {
            socket.join(gameToJoin._id);
            io.to(gameToJoin._id).emit("gameUpdate",updatedGame);
            hinterWaitingList.splice(0,1);
          }
        })
      })
    }else{
      // if there's no game waiting to be joined
      guesserWaitingList.push({
        userId: data.userId,
        socketId: socket.id
      })
    }
  })
});

// Connection to DB
mongoose.connect('mongodb://mongodb')
    .then(() => {
      console.log('Backend Started');
    })
    .catch(err => {
        console.error('Backend error:', err.stack);
        process.exit(1);
    });

// Routes and Backend Funcioncalities
var gameRoutes = require('./src/routes/gameRoutes');
var userRoutes = require('./src/routes/userRoutes');

// App Instance
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use("/game", gameRoutes);
app.use("/user", userRoutes);

// bindindSocket
var bindingSocket = function(req,res,next){
  req.socketIO = io;
  next()
}
app.use(bindingSocket);

// Execute App
http.listen(port, () => {
  console.log("App's running on: ", port);
});