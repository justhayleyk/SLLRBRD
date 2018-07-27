
// Temporary Global Array (Database) to hold Results
var tempDatabase = [];
(function ($) {
  // On document load run the following function
  $(document).ready(function () {
    api_key = "yz0w696n0aejuw02sun10wi0";
    // Search term for Queries
    terms = "stickers";
    etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=" +
      terms + "&limit=12&includes=Images:1&api_key=" + api_key;

    $.ajax({
      url: etsyURL,
      dataType: 'jsonp',
      success: function (data) {
        console.log(data);
        if (data.ok) {
          $.each(data.results, function (i, item) {
            var listItem = [];
            // get Image
            listItem.push(item.Images[0].url_fullxfull);
            // get Description
            listItem.push(item.description);
            // get Price
            listItem.push(item.price);
            // HardCoded User to hold database
            listItem.push("Sandra")
            // Push resulting Arrary into Global Array
            tempDatabase.push(listItem);
          });
        } else {
          alert(data.error);
        }
      }
    });
    return false;
  });

})(jQuery);