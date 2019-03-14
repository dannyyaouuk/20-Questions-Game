var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
var User = new Schema({
  _id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  inGame: {
    type: Boolean
  },
  gameId: {
    type: String
  },
  charactor:{
    type: Number
  }
},{
    collection: 'User'
});

module.exports = mongoose.model('User', User);