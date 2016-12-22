var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: String,
  breed: String,
  active: Boolean,
  lazy: Boolean,
  hypoallergenic: Boolean,
  good_with_kids: Boolean,
  good_with_dogs: Boolean,
  good_with_cats: Boolean,
  size: String,
});

var model = mongoose.model('Dog', schema);

// Make this available to our other files
module.exports = model;
