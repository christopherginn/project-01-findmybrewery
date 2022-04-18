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


        // saveBtn.forEach (save => {
        //     save.addEventListener('click', function (evt){
        //         console.log("save clicked", evt.target.getAttribute("data-name"));
        //         var newFavorite = evt.target.getAttribute("data-name");
        //     });
        // });
        

        // saveBtn.addEventListener("click", function(event){
        // console.log(event.target.getAttribute("data-name"))
        // localStorage.setItem("favorite", event.target.getAttribute("data-name"));
    });
        
        
    
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
                      <div class="card-footer-item save" id="save-to-favorites" data-name="${data[i].name}">Save to Favorites</div>
                      <a href="./ind_result.html?name=${data[i].name}" class="card-footer-item" id="get-directions">Get Directions</a>
                    </footer>
                  </div>
            </section>
                    `
    document.getElementById("brewery-display").appendChild(div);
    
    }

    var saveBtn = document.querySelectorAll(".save");

        for (var i=0; i<saveBtn.length; i++){
            saveBtn[i].addEventListener('click', function(evt){
                var newFav = evt.target.getAttribute("data-name")
                save(newFav);
            });
        }
    
};

// function save(newFavorite){

//     if (localStorage.getItem('favorites') == null){
//         localStorage.setItem('favorites', "[]");
//     }

//     var old_data = JSON.parse(localStorage.getItem('data'));
//     old_data.push(newFavorite);
// }

function save(newFav){
    var newFavorite = newFav;
    if(localStorage.getItem('data') == null){
        localStorage.setItem('data', '[]');
    }

    var old_data = JSON.parse(localStorage.getItem('data'));
    console.log(old_data);
    if (old_data.indexOf(newFavorite) == -1){
        old_data.push(newFavorite);
        localStorage.setItem('data', JSON.stringify(old_data));
        viewFavs();
    }
    console.log(old_data);
    
        
};

function viewFavs(){
    document.getElementById("button-container").innerHTML = "";
    if (localStorage.getItem('data') != null){
        var pullData = JSON.parse(localStorage.getItem('data'));
        
        for (var i=0; i< pullData.length; i++){
            console.log(pullData[i])
            var div = document.createElement('div');
            div.innerHTML=`
            <button class="column is-full favBtn" data-name="${pullData[i]}">${pullData[i]}</button>
            `
            document.getElementById("button-container").appendChild(div);
        }

        var favBtn = document.querySelectorAll(".favBtn");
        for (var i=0; i<favBtn.length; i++){
            favBtn[i].addEventListener('click', function(evt){
                 document.location = (`./ind_result.html?name=${evt.target.getAttribute("data-name")}`)
            })
        };

    }
};

function alreadySaved(){
    var saveBtn = document.querySelectorAll(".save");
    var old_data = JSON.parse(localStorage.getItem('data'));
    for (var i=0; i<saveBtn.length; i++){
        if (old_data.indexOf(saveBtn[i].getAttribute("data-name"))){
            
            saveBtn[i].textContent = "Already Saved";
        }
    }
};
viewFavs();
alreadySaved();
