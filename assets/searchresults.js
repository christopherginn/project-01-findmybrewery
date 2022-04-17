console.log("hello search results");

var baseUrl = "https://api.openbrewerydb.org/breweries?by_state=georgia";
var googleAPIKey = "AIzaSyCNnCjPwllZ0K35IujZeR9a98MKnlG3xr0";

// document.getElementById("back").addEventListener("click", function(){
//     document.location.replace("./searchstart.html");
// });

urlString = document.location.search;
var city = urlString.split("city=")[1].split("&")[0];
console.log(city);
var type = urlString.split("&type=")[1];
console.log(type);

if (city === ""){
    console.log("No city")
}

if (type === ""){
    console.log("No type")
}



if (city !== "" && type !== "") {
    fetch(`${baseUrl}&by_city=${city}&by_type=${type}`).then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        cityformat = city.split("%20");
        // cityformat = cityformat.split(" ");
        for (var i = 0; i < cityformat.length; i++){
            cityformat[i] = cityformat[i][0].toUpperCase() + cityformat[i].substr(1);
        }
        cityformat = cityformat.join(" ");
        console.log(cityformat)
    
        var div = document.createElement('div');
        div.innerHTML = `
        <div class=column">
            <div class="card">
                <div class="card-content">
                    <div class="content"><p>Displaying ${data.length} result(s) for ${type}-type breweries in ${cityformat}, GA.</p></div>
                </div>
            </div>
        </div>`
        document.getElementById("brewery-display").appendChild(div);
        populateResults(data);
        
        
    })
} else if (city !== "" && type === ""){
    fetch(`${baseUrl}&by_city=${city}`).then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        typeFilter(data);
        
    })
} else if (city === "" && type !== ""){
    fetch(`${baseUrl}&by_type=${type}`).then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        populateResults(data);
    })
}

function typeFilter(data){
    var filteredData = [];
    
    for (var i = 0; i < data.length; i++) {
        var dataBreweryType = data[i].brewery_type;
        if (dataBreweryType === "micro" || dataBreweryType === "brewpub" || dataBreweryType === "regional"){
            filteredData.push(data[i])
        }
    }
    console.log(filteredData)
    populateResults(filteredData);
    return;
}

function populateResults(data){
    
    for (var i = 0; i < data.length; i++){
    var div = document.createElement('div');
                // div.classList = "";
                div.innerHTML = `
                <section class="column">
                <!-- card to display the brewery search results -->
                <div class="card">
                    <header class="card-header">
                      <p class="card-header-title" id="brewery-name">${data[i].name}</p>
                    </header>
                    <div class="card-content">
                      <div class="content" id="brewery-info">
                        
                            Type: ${data[i].brewery_type}<br><br>
                            Address: ${data[i].street}, ${data[i].city}, GA, ${data[i].postal_code}<br><br>
                            Phone: ${data[i].phone}<br><br>
                            Website: <a href="${data[i].website_url}">${data[i].website_url}</a>
                        
                        <br>
                      </div>
                    </div>
                    <footer class="card-footer">
                      <a href="#" class="card-footer-item" id="save-to-favorites">Save to Favorites</a>
                      <a href="./ind_result.html?name=${data[i].name}" class="card-footer-item" id="get-directions">Get Directions</a>
                    </footer>
                  </div>
            </section>
                    `
    document.getElementById("brewery-display").appendChild(div);
    // gecodeAddress(data);
    }
};

// function gecodeAddress(data){
//     for (var i =0; i < data.length; i++){
//         var address = `${data[i].street}, ${data[i].city}, ${data[i].state}`.replaceAll(" ", "+");
        
//         fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleAPIKey}`).then(function(response){
//             return response.json();
//           })
//           .then(function(data){
//             console.log(data)
//             var lat = Number(data.results[i].geometry.location.lat);
//             var lon = Number(data.results[i].geometry.location.lng);
//             var name = data[i].name;
//             var latlon = [lat, lon, name];
//             console.log(latlon);
//             // console.log(lat + typeof lat)
//             console.log("geocode address reults: "+latlon)
//             initMap(latlon);
//           });
//     }
// };

// function initMap(latlon) {
//     latlonFormatted = { lat: Number(latlon[0]), lng: Number(latlon[1]) };
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 16,
//       center: latlonFormatted,
//     });
    
//     const marker = new google.maps.Marker({
//       position: latlonFormatted,
//       map: map,
//       label: latlon[2],
//       animation: google.maps.Animation.DROP,
//     });
// }