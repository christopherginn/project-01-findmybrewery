var place = ["micro","nano","regional","brewpub"];
var cors = "https://cors-anywhere.herokuapp.com/";
var baseUrl = "https://api.openbrewerydb.org/breweries";
var Url = `${baseUrl}?by_state=georgia&by_city=atlanta&per_page=10`;
var googleAPIKey = "AIzaSyCNnCjPwllZ0K35IujZeR9a98MKnlG3xr0";

var urlString = document.location.search;
var nameCallback = urlString.split("=")[1];


fetch(`${baseUrl}?by_name=${nameCallback}`).then(function(response){
    return response.json();
})
.then(function(data){
    console.log(data);

    var street = data[0].street.replaceAll(" ", "+");
    var address = [data[0].name,`${data[0].street}, ${data[0].city}, ${data[0].state}`.replaceAll(" ", "+")];
    console.log(address[1])

    geocodeAddress(address);
});

function geocodeAddress(address){
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address[1]}&key=${googleAPIKey}`).then(function(response){
      return response.json();
    })
    .then(function(data){
      console.log(data)
      var lat = Number(data.results[0].geometry.location.lat);
      var lon = Number(data.results[0].geometry.location.lng);
      var name = address[0];
      var latlon = [lat, lon, name];
      console.log(latlon);
      // console.log(lat + typeof lat)
      console.log("geocode address reults: "+latlon)
      initMap(latlon);
    });
    
};

// Initialize and add the map
function initMap(latlon) {
    latlonFormatted = { lat: Number(latlon[0]), lng: Number(latlon[1]) };
    
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: latlonFormatted,
    });
    
    const marker = new google.maps.Marker({
      position: latlonFormatted,
      map: map,
      // label: latlon[2],
      animation: google.maps.Animation.DROP,
    });
}
