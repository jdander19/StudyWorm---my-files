//MAPS - Google map api init.
function initMap () {
    var utCampus = { lat: 30.2849, lng: 97.7341 };
    var map = new google.maps.Map(document.getElementById('trafficSection'), {
        zoom: 14,
        center: utCampus,
      });

      //traffic layer functionality.
      var trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);

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

     var directionsService = new google.maps.DirectionsService();
     var directionsDisplay = new google.maps.DirectionsRenderer();

     var directionRequest = {
       origin: user_location,
       destination: utCampus,
       travelMode: 'DRIVING'
     };

     directionsService.route(
       directionRequest,
       function(response, status) {
         if (status === 'OK') {
           directionsDisplay.setDirections(response);

         } else {
          window.alert('Directions request failed due to ' + statu**-------------------------------------s);
         }
       }
     );


     directionsDisplay.setMap(map);

    console.log(directionsDisplay);

     }, function () {
       console.log('Error in the geolocation service.');
     });
     } else {
      console.log('Browser does not support geolocation.');
     }

     }

     initMap();
});
// END OF MAP