console.log("Hello");

var enterBtnEl = $('#enterBtn');
var modalEl = $('.modal');

enterBtnEl.on("click", function () {
  modalEl.addClass("is-active");

  $(function (){
      $('#datepicker').datepicker({
          changeMonth: true,
          changeYear: true
      });
  });
});

// var enterBtnEl = document.getElementById("#enterBtn");

// enterBtnEl.addEventListener("click", function () {
//   // alert("Works");
// });

