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
  var store = firebase.storage();

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

  // bottom of on document ready
});
