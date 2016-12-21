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

  lock.on("authenticated", function(authResult) {
    alert('called');
    //set token in localStorage after authenticated,
    localStorage.setItem('id_token', authResult.idToken);

    lock.getProfile(authResult.idToken, function(error, profile) {

      if (error) {
        // Handle error
        console.error(error);
        return;
      }
      console.log('profile: ', profile);

      //checkPrefs(profile)
      console.log('authResult.idToken', authResult.idToken);


      retrieve_profile();
      console.log(retrieve_profile());
      // Display user information
      // show_profile_info(profile);
      //check p
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


  //retrieve the profile:
  var retrieve_profile = function() {
    var id_token = localStorage.getItem('id_token');
    console.log('id_token is: ', id_token);
    if (id_token) {
      console.log('we have it');
      lock.getProfile(id_token, function (err, profile) {
        if (err) {
          return alert('There was an error getting the profile: ' + err.message);
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
