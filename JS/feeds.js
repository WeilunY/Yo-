var number = 1;

function appendCard() {
  $(".midcolumn").append("<div class='card' id='card-t'>\
    <h2>TITLE HEADING new" + " " + number + "</h2>\
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



// filter
filterSelection("all")

function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filter");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}




// Show More
function showmore(num) {
  var dots = document.getElementById("dots" + num);
  var moreText = document.getElementById("more" + num);
  var btnText = document.getElementById("rm" + num);

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

function typeComment(num) {
  var x = document.getElementById("type" + num);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showComments(num) {
  var x = document.getElementById("hd" + num);
  var btnText = document.getElementById("ldm" + num);
  if (x.style.display === "none") {
    x.style.display = "block";
    btnText.innerHTML = "View Less Comments";
  } else {
    x.style.display = "none";

    btnText.innerHTML = "Load More Comments";
  }
}

$('.like').click(function() {
  $(this).toggleClass('btn-outline-success');
  $(this).toggleClass('btn-success');
});
