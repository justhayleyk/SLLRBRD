//MAIN JAVASCRIPT FILE -- We will pull the items over to this file.

// Initialize Firebase
// var config = JSON.parse(localStorage.getItem('sbConfig'));
var config = {
  apiKey: 'AIzaSyDcOMILm8F_Mx8SD8B-SYkgGTxnTQ4nFXE',
  authDomain: 'sb-sllrbrd.firebaseapp.com',
  databaseURL: 'https://sb-sllrbrd.firebaseio.com',
  projectId: 'sb-sllrbrd',
  storageBucket: 'sb-sllrbrd.appspot.com',
  messagingSenderId: '407280221848'
};

firebase.initializeApp(config);

// Global Variable Declarations
var email = ''; // email for authentication
var pwd = ''; // pwd for authentication
var sessionUser; // Obhject to get Session User Details

// REAL-TIME LISTENER
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#login, #signUp, #password').attr('style', 'display:none');
    $('#logout').attr('style', '');
    $('#email').val(user.email);
    sessionUser = user;
    // CONTROL REDIRECT AFTER SUCCESSFUL AUTHENTICATION
    // window.location = 'index.html'; //After successful login, user will be redirected to home.html
  } else {
    // No user is signed in.
    $('#logout').attr('style', 'display:none');
    $('#signUp, #login, #password').attr('style', '');
    $('#email').val('');
  }
});

$(document).ready(function() {
  // Storage Variable
  var store = firebase.storage();

  // Database Variable

  var postimageURL;
  var postdescription;
  var posttitle;
  var postprice;
  var postuserID;
  var html = '';
  var fName = '';
  var lName = '';
  var phone = '';

  var db = firebase.database();
  var dbAds = db.ref('/ads'); // shorthand for data = db.re() &  data.child('ads')
  var dbUsers = db.ref('/users'); // Shorthand for Users

  dbAds.on('value', function(ads) {
    // FIRST GET THE SNAPSHOP FROM THE DB -- THIS IS AN OBJECT
    ads.forEach(function(ad) {
      // BEFORE WE CAN ACCESS THE PROPERTIES, WE NEED TO LOOP THROUGH THE OBJECT AND PASS IN THE ad
      postID = ad.key;
      postimageURL = ad.val().imageURL;
      postdescription = ad.val().description;
      posttitle = ad.val().title;
      postprice = ad.val().price;
      postuserID = ad.val().userID;

      html =
        '<div class="content"><div class="ui items"><div class="item"><div class="postItemImage ui small image"><img src="' +
        postimageURL +
        '"></div><div class="content" style="padding: 1rem;"><h2 class="header postTitle">' +
        posttitle +
        '</h2><div class="postDescription"><p>' +
        postdescription.slice(0, 250) +
        " . . .   <br> <br><a href='individualAd.html?postid=" +
        postID +
        "'> Read More</a>" +
        '</p></div><br><div class="postPrice"><h3>Price: $<span class="price">' +
        postprice +
        '</span></h3></div></div></div></div></div>';
      $('.postItem').append(html);
    });
  });

  // ================================
  // ======= Authentication =========
  // ================================
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
        // console.log(error);
        // [END_EXCLUDE]
      });
  });

  // LOGOUT LISTENER
  $('#logout').click(function(event) {
    event.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, pwd)
      .then(function() {
        email = $('#email')
          .val()
          .trim();
        fName = $('#fName')
          .val()
          .trim();
        lLame = $('#LName')
          .val()
          .trim();
        phone = $('#phone')
          .val()
          .trim();
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        // ...
      });
  });

  // bottom of on document ready
});
