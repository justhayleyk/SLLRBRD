//MAIN JAVASCRIPT FILE -- We will pull the items over to this file.
// 'use strict';

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
  var dbAds = db.ref('/ads'); // shorthand for data = db.re() &  data.child('ads')

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

  function postAd(currentUser) {
    var userID = currentUser;
    var dbRef = db.ref('ads');
    var title = $('#title')
      .val()
      .trim();
    var description = $('#description')
      .val()
      .trim();
    var price = $('#price')
      .val()
      .trim();
    var file = $('#image').get(0).files[0];
    var imgName = $('#image')
      .val()
      .trim();

    if (
      userID.length > 0 &&
      title.length > 0 &&
      imgName.length > 0 &&
      description.length > 0 &&
      price.length > 0
    ) {
      var adID = dbRef.push().key;
      var imgPath = '/images/' + adID + '/';
      var fileName = file.name;
      var imgURL = imgPath + fileName;
      var sRef = store.ref(imgURL);

      sRef
        .put(file)
        .then(function() {
          console.log('Image upload successful');
          return sRef.getDownloadURL();
        })
        .then(function(imageURL) {
          console.log('url:' + imageURL);
          console.log('Download URL acquired successfully');

          var ad = {
            userID: userID,
            title: title,
            imageURL: imageURL,
            description: description,
            price: price,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
          };

          var adRef = dbRef.child(adID);
          adRef.update(ad);
        })
        .then(function() {
          console.log('Successfully saved to database.');
          $('#postForm')[0].reset();
        })
        .catch(function(error) {
          console.log('Error:' + error);
        });
    }
  }

  // bottom of on document ready
});
