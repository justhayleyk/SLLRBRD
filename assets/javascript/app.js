//MAIN JAVASCRIPT FILE -- We will pull the items over to this file.
// 'use strict';
$(document).ready(function() {
  // Initialize Firebase
  // var config = JSON.parse(localStorage.getItem('sbConfig'));
  var config = {
    apiKey: "AIzaSyDcOMILm8F_Mx8SD8B-SYkgGTxnTQ4nFXE",
    authDomain: "sb-sllrbrd.firebaseapp.com",
    databaseURL: "https://sb-sllrbrd.firebaseio.com",
    projectId: "sb-sllrbrd",
    storageBucket: "sb-sllrbrd.appspot.com",
    messagingSenderId: "407280221848"
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
  var html = "";

  var db = firebase.database();
  var dbAds = db.ref("/ads"); // shorthand for data = db.re() &  data.child('ads')

  dbAds.on("value", function(ads) {
    // FIRST GET THE SNAPSHOP FROM THE DB -- THIS IS AN OBJECT
    ads.forEach(function(ad) {
      // BEFORE WE CAN ACCESS THE PROPERTIES, WE NEED TO LOOP THROUGH THE OBJECT AND PASS IN THE ad

      postimageURL = ad.val().imageURL;
      postdescription = ad.val().description;
      posttitle = ad.val().title;
      postprice = ad.val().price;
      postuserID = ad.val().userID;

      html =
        '<div class="content"><div class="ui items"><div class="item"><div class="postItemImage ui small image"><img src="' +
        postimageURL +
        '"></div><div class="content" style="padding: 1rem;"><a class="header postTitle">' +
        posttitle +
        '</a><div class="postDescription"><p>' +
        postdescription.slice(0, 250) +
        " . . .   <br> <br><a href='#'> Read More</a>" +
        '</p></div><br><div class="postPrice"><h3>Price: $<span class="price">' +
        postprice +
        "</span></h3></div></div></div></div></div>";
      $(".postItem").append(html);
    });
  });

  // bottom of on document ready
});
