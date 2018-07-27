'use strict';
$(document).ready(function() {
  var dbConfig = {
    apiKey: 'AIzaSyDcOMILm8F_Mx8SD8B-SYkgGTxnTQ4nFXE',
    authDomain: 'sb-sllrbrd.firebaseapp.com',
    databaseURL: 'https://sb-sllrbrd.firebaseio.com',
    projectId: 'sb-sllrbrd',
    storageBucket: 'sb-sllrbrd.appspot.com',
    messagingSenderId: '407280221848'
  };
  firebase.initializeApp(dbConfig);

  var db = firebase.database();
});
