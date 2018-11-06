var number = 1;
function appendCard() {
  $(".leftcolumn").append( "<div class='card' id='card-t'>\
    <h2>TITLE HEADING new" + " " + number +"</h2>\
    <h5>Title description, Dec 7, 2017</h5>\
    <div class='fakeimg' style='height:200px;'>Image</div>\
    <p>Some text..</p>\
  </div>");

  number = number + 1;
}

//click
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
var count = 0;
function showHidden() {

    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
