var mongoose = require('mongoose');
var Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var schema = new mongoose.Schema({
  playlist: {
    type: ObjectId,
    required: true,
    ref: 'Preference',
    index: true
  },
  dog: {
    type: ObjectId,
    required: true,
    ref: 'Dog',
    index: true
  },
  created: Date
});

var model = mongoose.model('userMatch', schema);

// Make this available to our other files
module.exports = model;
