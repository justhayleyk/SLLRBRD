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

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('#login, #signUp, #password').attr('style', 'display:none');
    $('#logout').attr('style', '');
    $('#email').val(user.email);
    sessionUser = user;
    displayNav(true);
    // CONTROL REDIRECT AFTER SUCCESSFUL AUTHENTICATION
    // window.location = 'index.html'; //After successful login, user will be redirected to home.html
  } else {
    displayNav(false);
    // No user is signed in.
    $('#logout').attr('style', 'dis   play:none');
    $('#signUp, #login, #password').attr('style', '');
    $('#email').val('');
  }
});

$(document).ready(function() {
  // Storage Variable
  var store = firebase.storage();

  //User Session

  // Database Variable

  // var postimageURL;
  // var postdescription;
  // var posttitle;
  // var postprice;
  // var html = "";

  var db = firebase.database();

  var dbRef = db.ref('ads');

  dbRef.on('child_removed', function(ads) {
    populateWithAds(ads);
  });

  dbRef.on('child_added', function(ads) {
    populateWithAds(ads);
  });

  dbRef.on('value', function(ads) {
    populateWithAds(ads);
  });

  function populateWithAds(ads) {
    $('.usersAd').html('');

    ads.forEach(function(ad) {
      var currentUser = sessionUser.email;
      var currentAd = ad;
      var user = ad.val().userID;
      if (user === currentUser) {
        var row = $('<div>');
        row.addClass('six wide column');
        var span = $('<span>');
        var btn = $('<button>');
        btn.addClass('delBtn');
        btn.attr('id', currentAd.key);
        btn.text('Delete');
        btn.on('click', function() {
          var adID = $(this).attr('id');
          console.log(adID);
          deleteAd(adID);
        });

        span.text('[' + currentAd.key + ']' + ' ===> ' + currentAd.val().title);
        row.append(span);
        row.append(btn);

        $('.usersAd').append(row);
      }
    });
  }

  function deleteAd(currentAd) {
    var adID = currentAd;
    var dbRef = db.ref('ads');
    var adRef = dbRef.child(adID);
    adRef.once('value').then(function(snapshot) {
      var sv = snapshot.val();
      var imagePath = sv.storagePath;

      adRef
        .remove()
        .then(function() {
          console.log('Ad successfully deleted');
          deleteImage(imagePath);
        })
        .catch(function(err) {
          console.log('Error in removing ad:' + JSON.stringify(err));
        });
    });
  }

  function deleteImage(imagePath) {
    var imageRef = store.ref(imagePath);
    imageRef
      .delete()
      .then(function() {
        console.log('Image successfully deleted.');
      })
      .catch(function(err) {
        console.log('Error in deleting image:' + err);
      });
  }
  // var dbPost = db.ref("/ads/" + urlParams.get("postid")); // shorthand for data = db.re() &  data.child('ads')

  // dbPost.on("value", function(ad) {
  //   postID = ad.key;
  //   postimageURL = ad.val().imageURL;
  //   postdescription = ad.val().description;
  //   posttitle = ad.val().title;
  //   postprice = ad.val().price;
  //   postuserID = ad.val().userID;

  //   html =
  //     '<div class="row"><div class="six wide column"><img class="ui large rounded image" src="' +
  //     postimageURL +
  //     '" alt="Ad Image"></div><div class="eight wide column"><h2>' +
  //     posttitle +
  //     "</h2><p>" +
  //     postdescription +
  //     '</p><h3>Price:<span id="price">' +
  //     postprice +
  //     '</span></h3><br><div class="ui link items"><div class="item"><a class="ui tiny circular image"><img src="assets/images/userimage.png"></a><div class="content"><h3>' +
  //     sessionuser.name +
  //     '</h3><div class="description"><p>Contact:</p><div class="ui buttons"><button class="ui button">Call</button><div class="or"></div><button class="ui positive button">Email</button></div></div></div></div></div></div></div><div class="row"></div>';
  //   $(".usersAd").append(html);
  // });

  // bottom of on document ready
});
