
var tempDatabase = [];
(function ($) {

  $(document).ready(function () {
    api_key = "yz0w696n0aejuw02sun10wi0";
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
            listItem.push(item.Images[0].url_fullxfull);
            listItem.push(item.description);
            listItem.push(item.price);

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