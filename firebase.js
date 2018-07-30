// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDcOMILm8F_Mx8SD8B-SYkgGTxnTQ4nFXE',
  authDomain: 'sb-sllrbrd.firebaseapp.com',
  databaseURL: 'https://sb-sllrbrd.firebaseio.com',
  projectId: 'sb-sllrbrd',
  storageBucket: 'sb-sllrbrd.appspot.com',
  messagingSenderId: '407280221848'
};
firebase.initializeApp(config);

// Variable Declarations
var email = '';
var pwd = '';
var sessionUser;

// REAL-TIME LISTENER
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#login, #signUp, #password').attr('style', 'display:none');
    $('#logout').attr('style', '');
    $('#email').val(user.email);
    sessionUser = user;
    window.location = 'index.html'; //After successful login, user will be redirected to home.html
  } else {
    // No user is signed in.
    $('#logout').attr('style', 'display:none');
    $('#signUp, #login, #password').attr('style', '');
    $('#email').val('');
  }
});

$(document).ready(function() {
  $('.ui.form').form({
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your e-mail'
          },
          {
            type: 'email',
            prompt: 'Please enter a valid e-mail'
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Please enter your password'
          }
        ]
      }
    }
  });

  // LOGIN LISTENER
  $('#login').click(function(event) {
    event.preventDefault();
    email = $('#email')
      .val()
      .trim();
    pwd = $('#password')
      .val()
      .trim();

    // LOGIN FUNCTION
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
  });

  // LOGOUT LISTENER
  $('#logout').click(function(event) {
    event.preventDefault();
    console.log('logout test');
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  });

  // SIGN UP  LISTENER
  $('#signUp').click(function(event) {
    event.preventDefault();
    email = $('#email')
      .val()
      .trim();
    pwd = $('#password')
      .val()
      .trim();
    console.log('CREATE USER TEST');
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pwd)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  });
});
