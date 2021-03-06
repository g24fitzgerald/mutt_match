var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  userId: String,
  active: Boolean,
  lazy: Boolean,
  dog_allergy:Boolean ,
  cat_allergy: Boolean,
  has_kids: Boolean,
  has_dogs: Boolean,
  has_cats: Boolean,
  home_size: String,
  want_dog: Boolean,
  want_cat: Boolean
});

var model = mongoose.model('Preference', schema);

// Make this available to our other files
module.exports = model;
