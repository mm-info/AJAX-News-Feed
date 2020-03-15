/*
  Please add all Javascript code to this file.
*/


let MyApp = {};

// MyApp.getInfo = function(locationValue) {
MyApp.getInfo = function() {
  let apiUrl = "https://api.mashable.com/v1/posts/";
  // let apiKey = "500c4b7143d8c7a3f9448bbf60798ca0";

  $.ajax({

    url: apiUrl,
    contentType: 'application/json',
    dataType: 'json',

    success: function(result) {
      console.log('got it');
      // Weather description
      // let overview = result.weather[0].description;

      // Temperature conversion
      // let kelv = result.main.temp;
      // let cels = kelv - 273;
      // let temperatureFahrenheit = Math.floor(cels * (9/5) + 32);
      //
      // alert('Temperature is ' + temperatureFahrenheit + ' degrees (F) in ' + locationValue + '. There will be ' + overview + ' today.' );
    }
  });
}

'use strict';

(function() {
  let button = $('.weatherButton');

  // Get location by Button text value
  button.on('click', function(e) {
    MyApp.getInfo($(this).text());
  });
})();
