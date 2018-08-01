$(document).ready(function() {
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

  // Storage Variable
  var store = firebase.storage();

  // Database Variable

  var postimageURL;
  var postdescription;
  var posttitle;
  var postprice;
  var postuserID;
  var html = '';

  var db = firebase.database();
  var dbPost = db.ref('/ads/' + urlParams.get('postid')); // shorthand for data = db.re() &  data.child('ads')

  dbPost.on('value', function(ad) {
    postID = ad.key;
    postimageURL = ad.val().imageURL;
    postdescription = ad.val().description;
    posttitle = ad.val().title;
    postprice = ad.val().price;
    postuserID = ad.val().userID;

    html =
      '<div class="row"><div class="six wide column"><img class="ui large rounded image" src="' +
      postimageURL +
      '" alt="Ad Image"></div><div class="eight wide column"><h2>' +
      posttitle +
      '</h2><p>' +
      postdescription +
      '</p><h3>Price:<span id="price">' +
      postprice +
      '</span></h3><br><div class="ui link items"><div class="item"><a class="ui tiny circular image"><img src="assets/images/userimage.png"></a><div class="content"><h3>Randall Dow</h3><div class="description"><p>Contact:</p><div class="ui buttons"><button class="ui button">Call</button><div class="or"></div><button class="ui positive button">Email</button></div></div></div></div></div></div></div><div class="row"></div>';
    $('.usersAd').append(html);
  });

  // bottom of on document ready
});
