//MAIN JAVASCRIPT FILE -- We will pull the items over to this file.
'use strict';
$(document).ready(function() {
  var config = JSON.parse(localStorage.getItem('sbConfig'));
  firebase.initializeApp(config);

  var db = firebase.database();

  var store = firebase.storage();
});
