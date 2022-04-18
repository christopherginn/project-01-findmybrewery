console.log("hello")

var submitBtnEl = document.getElementById('submitBtn');
var optionMicro = document.getElementById('typechoice-micro');
var optionRegional = document.getElementById('typechoice-regional');
var optionBrewpub = document.getElementById('typechoice-brewpub');

var baseUrl = "https://api.openbrewerydb.org/breweries?by_state=georgia";


submitBtn.addEventListener("click", function (event){
    event.preventDefault();

    var getSelectedType = document.querySelector( 'input[name="type"]:checked');
    if (!getSelectedType) {
        // console.log("no type selected")
    } else {
        // console.log("Select type: " + getSelectedType.value)
    }
    // console.log("Selected radio button values is: " + getSelectedType);

    var getCityInput = document.querySelector('#city-input').value;
    // console.log("Entered city is: " + getCityInput);
    // storeCityLocation(getCityInput);
    

    if (!getSelectedType && !getCityInput) {
        alert("Not enough info")
    } else if (getCityInput && !getSelectedType) {
        document.location.replace(`./result-index.html?city=${getCityInput}&type=`)

    } else if (getSelectedType && !getCityInput) {
        document.location.replace(`./result-index.html?city=&type=${getSelectedType.value}`)
    
    } else if (getCityInput && getSelectedType) {
        document.location.replace(`./result-index.html?city=${getCityInput}&type=${getSelectedType.value}`)
    
    }
});

