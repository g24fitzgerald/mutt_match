$(document).ready(function() {
  var lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {
    auth: {
      redirectUrl: AUTH0_CALLBACK_URL,
      responseType: 'token',
      params: { scope: 'openid email' } //Details: https://auth0.com/docs/scopes
    }
  });

  $('.btn-login').click(function(e) {
    e.preventDefault();
    lock.show();
  });

  $('.btn-logout').click(function(e) {
    e.preventDefault();
    logout();
  })
  //after completing quiz, generate profile need to tie to body becuase SPA loads .generate_profile button late
  $('body').on('click', '.generate_profile', function(e) {
    generateProfile();
    e.preventDefault();
  });

  lock.on("authenticated", function(authResult) {
    //set token in localStorage after authenticated,
    localStorage.setItem('id_token', authResult.idToken);

    lock.getProfile(authResult.idToken, function(error, profile) {

      if (error) {
        console.error(error);
        return;
      }
      console.log('profile: ', profile);
      //checkPrefs(profile)
      console.log('authResult.idToken', authResult.idToken);

      retrieve_profile();
      console.log(retrieve_profile());

      checkPreference(profile);
    });
  });

  function loadQuiz(){
    console.log('loadQuiz');
    $('#result').load('/questions.html #main');
  };

  var checkPreference = function( profile ){
    //access database with get request to backend (ajax) using jwt to veryify good connection
    var idToken = localStorage.getItem('id_token');
    console.log('new token: ', idToken);

    var request = $.ajax({
      url: 'http://localhost:3000/checkprefs', //we shouldn't hardcode this
      method: 'POST',
      //need to send authorization header
      headers: {
        'Authorization': 'Bearer ' + idToken
      },
      //equivalent to req.body
      data: {
        userid: profile.user_id
      }
    });
//THIS ISNT WORKING RIGHT
    request.done(function(results){
      console.log('results: ',results);
      if (results) {
        //if we have a profile
      }
      else {
        loadQuiz();
      }
      // for (var i = 0, x = results.length; i<x; i++){
      //   $('.main_ul').append('<li>' + results[i].size + '</li>');
      // }
    });
  };
  //generate profile
  var generateProfile = function(){
    //generate Profile object with all values set to false
    var Profile = {
      active: false,
      lazy: false,
      dog_allergy:false ,
      cat_allergy: false,
      has_kids: false,
      has_dogs: false,
      has_cats: false,
      home_size: false,
      want_dog: false,
      want_cat: false
    }
    //access idToken because call requires jwt token
    var idToken = localStorage.getItem('id_token');
    var $profile_value = $('.boxes').find('input');
    //set values of Profile keys
    $profile_value.each(function(i,box){
      box = $(box);
      switch(box.val()){
        case 'Allergic to dogs':
          Profile.dog_allergy = box.is(':checked');
        break;
        case 'Allergic to cats':
          Profile.cat_allergy = box.is(':checked');
        break;
        case 'I have children':
          Profile.has_kids = box.is(':checked');
        break;
        case 'I have a dog':
          Profile.has_dogs = box.is(':checked');
        break;
        case 'I have a cat':
          Profile.has_cats = box.is(':checked');
        break;
        case 'Sleep all the time':
          Profile.lazy = box.is(':checked');
        break;
        case 'Snuggle on the couch':
          Profile.lazy = box.is(':checked');
        break;
        case 'Play outside 24/7':
          Profile.active = box.is(':checked');
        break;
        case 'Go running/jogging/swimming':
          Profile.active = box.is(':checked');
        break;
        case 'Dog':
          Profile.want_dog = box.is(':checked');
        break;
        case 'Cat':
          Profile.want_cat = box.is(':checked');
        break;
        case 'House':
          if (box.is(':checked')){
            Profile.home_size = "large";
          }
          else {Profile.home_size = "small"}
        break;
      }
    });

    console.log('Final profile: ', Profile);
    var request = $.ajax({
      url: 'http://localhost:3000/api/userpreference', //Do we need to make a new route?
      method: 'POST',
      // need to send authorization header
      headers: {
        'Authorization': 'Bearer ' + idToken
      },
      data: Profile
    });
    request.done(function(results){
      console.log('results: ',results);
      if (results) {
        console.log('results: ', results);
      }
      else {
        console.log('results did not exist')
      }
    });
  };

  //retrieve the profile:
  var retrieve_profile = function() {
    var id_token = localStorage.getItem('id_token');
    console.log('id_token is: ', id_token);
    if (id_token) {
      console.log('we have it');
      lock.getProfile(id_token, function (err, profile) {
        if (err) {
          console.error('There was an error getting the profile: ' + err.message);
        }
        // Display user information
        show_profile_info(profile);
      });
    }
  };

  var show_profile_info = function(profile) {
    console.log('In the profile!');
    //  $('.nickname').text(profile.nickname);
     $('.btn-login').hide();
    //  $('.avatar').attr('src', profile.picture).show();
     $('.btn-logout').show();
  };

  var logout = function() {
    localStorage.removeItem('id_token');
    window.location.href = "/";
  };
  retrieve_profile();
});
