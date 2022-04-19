var showFavs = document.getElementById("show-favorites");
var favModalEl = $('#fav-modal');
var cancelBtn= $('#cancel-button');
var closeBtn = $('#close-modal');

var searchPageBtn = document.getElementById("search-page");

searchPageBtn.addEventListener("click", function(){
    console.log("search page btn works")
    document.location=("./search-main.html");
});

showFavs.addEventListener("click", function(){
    favModalEl.addClass("is-active");
    viewFavModal();
})

closeBtn.on("click", function(){
    favModalEl.removeClass("is-active");
})

cancelBtn.on("click", function(){
    favModalEl.removeClass("is-active");
});

function viewFavModal(){
    document.getElementById("favlist").innerHTML = "";
    if (localStorage.getItem('data') != null){
        var pullData = JSON.parse(localStorage.getItem('data'));
        
        for (var i=0; i< pullData.length; i++){
            console.log(pullData[i])
            var div = document.createElement('div');
            div.innerHTML=`
            
              <div class="favBtn is-half" data-name="${pullData[i]}">${pullData[i]} <button class="delete" data-name="${pullData[i]}">X</button></div>
              <br>
            </div>
            `
            document.getElementById("favlist").appendChild(div);
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
                evt.preventDefault();
                var value = evt.target.getAttribute("data-name");
                delModal(value);
            })
        };
    }
};

function delModal(value){
	if (localStorage.getItem('data') === null) { 
		console.log("local storage not saved yet...");
	} else {		
		var old_data = JSON.parse(localStorage.getItem('data'));
		var index   = old_data.indexOf(value);
		
		if(index == -1){
		// if not matched selected index	
		} else {
			// is matched, remove...
			old_data.splice(index, 1);
			localStorage.setItem('data', JSON.stringify(old_data));
			// console.log(old_data);  
			// viewFavModal();
		}
	}
}