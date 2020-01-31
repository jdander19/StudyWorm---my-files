//TIMER
// console.log("timer.js connected");

var time = document.getElementById('timerButton');
var start = document.getElementById('timerButton');
// var pause = document.getElementById('pause');
var stop = document.getElementById('timerButton');
var seconds = 0;
var minutes = 0;
var hours = 0;
var t;
// addedTime is a decimal / float so that we could see the fractional changes
var addedSeconds = 0, addedMinutes = 0, addedHours = 0, addedTime = 0.01, newTime = 0;


function add() {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  time.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" + (seconds > 9 ? seconds : "0" + seconds);

  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}


$("#timerButton").on("click", function (event) {
  event.preventDefault();
  $("#timerButton").empty().append("Stop");
  clearTimeout(t);
  timer();
  console.log("Start");
});

// $("#timerButton").on("click", function () {
//   clearTimeout(t);
//   $("#timerButton").empty().append("Start");
// });

$("#timerButton").on("click", function () {

  console.log("seconds: " + seconds + " minutes: " + minutes + " hours: " + hours);
  //send the values to go get added
  add(hours, minutes, seconds);
  //console.log("stop");
  $("#timerButton").empty().append("Start");
  clearInterval(t);
  time.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;


});

//End of TIMER




//MAPS - Google map api init.
function initMap() {
  var utCampus = { lat: 30.2861, lng: -97.7394 };
  var map = new google.maps.Map(document.getElementById('trafficSection'), {zoom: 4, center: utCampus});
  var marker = new google.maps.Marker({position: utCampus, map: map});
}

  //traffic layer functionality.
  // var trafficLayer = new google.maps.TrafficLayer();
  // trafficLayer.setMap(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const user_location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(user_location);

      var userLocation = new google.maps.Marker({
        position: {
          lat: user_location.lat,
          lng: user_location.lng
        },
        map: map,
        title: "You are here"
      });

      //  var directionsService = new google.maps.DirectionsService();
      //  var directionsDisplay = new google.maps.DirectionsRenderer();

      //  var directionRequest = {
      //    origin: user_location,
      //    destination: utCampus,
      //    travelMode: 'DRIVING'
      //  };

      //  directionsService.route(
      //    directionRequest,
      //    function(response, status) {
      //      if (status === 'OK') {
      //        directionsDisplay.setDirections(response);

      //      } else {
      //       window.alert('Directions request failed due to ' + status**-------------------------------------);
      //      }
      //    }
      //  );


      //  directionsDisplay.setMap(map);

      // console.log(directionsDisplay);

    }, function () {
      console.log('Error in the geolocation service.');
    });
  } else {
    console.log('Browser does not support geolocation.');
  }



 initMap();
// };
// END OF MAP

