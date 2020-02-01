console.log("maps.js linked");

//MAPS - Google map api init.
function initMap() {
  var map = new google.maps.Map(document.getElementById('trafficSection'), {
    zoom: 16,
    center: myLatLng
  });
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "You're Here!"
  });
}