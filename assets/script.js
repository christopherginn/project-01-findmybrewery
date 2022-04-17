console.log("Hello");

var enterBtnEl = $('#enterBtn');
var modalEl = $('#age-check-modal');
var closeModalEl = $('#close-modal');
var submitBtn = $('#submit-button');
var cancelBtn=$('#cancel-button');
var accessDeniedmodal = $('#access-denied');


enterBtnEl.on("click", function () {
  // modalEl.fadeIn('fast', function(){
  //   modalEl.addClass("is-active");
  // });
  modalEl.addClass("is-active");
  // accessDeniedmodal.addClass("is-active");
  $('#datepicker').val("");
  // $('#datepicker').wrap('<div style="position:absolute;top:0px;"></div>');

  $(function (){
      $('#datepicker').datepicker({
          changeMonth: true,
          changeYear: true,
          yearRange: '-100:+0',
          showButtonPanel: true
      });
  });


  // var birthdateInput = $('#datepicker').val();
  // console.log(birthdateInput);
});

cancelBtn.on("click", function(){
  modalEl.removeClass("is-active");
});

submitBtn.on("click", function(){
  // alert("works")
  var birthdateInput = $('#datepicker').val();
  var formattedBirthDate = new Date(birthdateInput);
  var today = new Date();
  var diff = (today - formattedBirthDate)/(1000*60*60*24*365);
  console.log(diff);

  if (!birthdateInput) {
    var errorMsg = $("<p></p>").css({"color":"red", "font-weight":"bold"}).text("Please enter a date.");
    $(".modal-card-body").append(errorMsg)
  } else if (diff < 21) {
    modalEl.removeClass("is-active");
    accessDeniedmodal.addClass("is-active");
    $('#access-close').on('click', function(){
      accessDeniedmodal.removeClass("is-active");
    })
    
  } else if (diff >= 21){
    document.location.replace("./index-searchbar.html");
  
  }

  closeModal();
});

function closeModal(){
  closeModalEl.on("click", function(){
    modalEl.removeClass("is-active");

  });
};

closeModal();


