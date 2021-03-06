var express = require('express');
var router = express.Router();

var Preference = require('../models/user_preference');
var Dog = require('../models/dog');

//get all playlists for a user
router.get('/profile', function(req, res, next) {

  Preference.find({ userId: req.user.aud }, '', function(err, result) {
    if (err) console.log(err);

    res.json(result);
  });
});
// create (post) a single profile
router.post('/userpreference', function(req, res){
  console.log('user: ', req.user.aud);

  // req.body.Profile.userId = req.user.aud;
  console.log('profile: ',req.body);
  //set user preference key userId value to tokenId
  req.body.userId = req.user.aud;

  var newProfile = new Preference(req.body);

  newProfile.save(function(err, preference){
    if (err) console.error(err);
    res.json(preference);
  });

});

router.post('/findmatch', function(req, res, next) {
  if (req.body) {
  var dogMatch = {  //find dogs with characteristics that match preference
    active: eval(req.body.active),
    lazy: eval(req.body.lazy),
    hypoallergenic: eval(req.body.dog_allergy),
    good_with_kids: eval(req.body.has_kids),
    good_with_dogs: eval(req.body.has_dogs),
    good_with_cats: eval(req.body.has_cats)
  };


    console.log(dogMatch);
    Dog.find(dogMatch, '',
     function(err, dog_matches) {
       if (err) console.error("find function error: ", err);
       console.log('finding matches');

      res.json(dog_matches);
     });
    }
    else {
      console.log('else hit in findmatch');
      res.send(false);
    }
  });


module.exports = router;
