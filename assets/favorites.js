viewFavs();

var saveBtn = document.querySelectorAll(".save");

for (var i=0; i<saveBtn.length; i++){
    saveBtn[i].addEventListener('click', function(evt){
        var newFav = evt.target.getAttribute("data-name")
        save(newFav);
    });
}

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

        if (pullData.length >= 1){
        
            for (var i=0; i< pullData.length; i++){
                console.log(pullData[i])
                var div = document.createElement('div');
                div.innerHTML=`
                <div class="favBtnObj columns is-vcentered is-full" data-name="${pullData[i]}">
                    <div class="column favBtn" data-name="${pullData[i]}">${pullData[i]}</div>
                    <div class="column is-1 delete" data-name="${pullData[i]}">X</div>
                </div>
                `
                document.getElementById("button-container").appendChild(div);
            }

            var favBtn = document.querySelectorAll(".favBtn");
            for (var i=0; i<favBtn.length; i++){
                favBtn[i].addEventListener('click', function(evt){
                    document.location = (`./ind_result.html?name=${evt.target.getAttribute("data-name")}`)
                })
            };

            var deleteBtn = document.querySelectorAll(".delete");
            for (var i=0; i<deleteBtn.length; i++){
                deleteBtn[i].addEventListener('click', function(evt){
                    var value = evt.target.getAttribute("data-name");
                    del(value);
                })
            };
        } else {
            var div = document.createElement('div');
            div.innerHTML=`<p>No breweries saved to favorites</p>`
            document.getElementById("button-container").appendChild(div);
        }
    } 
    else {
        var div = document.createElement('div');
        div.innerHTML=`<p>No breweries saved to favorites</p>`
        document.getElementById("button-container").appendChild(div);
    };
};

function del(value){
	if (localStorage.getItem('data') === null) { 
		console.log("local storage not saved yet...");
	} else {		
		var old_data = JSON.parse(localStorage.getItem('data'));
		var index   = old_data.indexOf(value);
		console.log("seçilen index:"+index);
		if(index == -1){
		// if not matched selected index	
		} else {
			// is matched, remove...
			old_data.splice(index, 1);
			localStorage.setItem('data', JSON.stringify(old_data));
			// console.log(old_data);  
			viewFavs();
		}
	}
}

