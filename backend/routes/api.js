var express = require('express');
var router = express.Router();

var Preference = require('../models/user_preference');
var Dog = require('../models/dog');
var UserMatch = require('../models/user_dog_match');

//get all playlists for a user
router.get('/profile', function(req, res, next) {
  //auth0's way of handling user
  // var userId = req.user.aud;
  // Find ALL documents that match the criteria passed, only return the "name" and "favorite" fields
  // console.log(userId);
  Preference.find({ userId: req.user.aud }, '', function(err, result) {
    if (err) console.log(err);
    // console.log(userId);
    // console.log(result);

    res.json(result);
  });
});
// create (post) a single profile
router.post('/userpreference', function(req, res){
  console.log('user: ', req.user.aud);

  // req.body.Profile.userId = req.user.aud;
  console.log('profile: ',req.body);

  req.body.userid = req.user.aud;

  var newProfile = new Preference(req.body);

  newProfile.save(function(err, preference){
    if (err) console.error(err);
    res.json(preference);
  });

});
module.exports = router;
