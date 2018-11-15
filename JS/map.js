/* Open when someone clicks on the span element */
function openFeeds() {
    document.getElementById("feeds").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeFeeds() {
    document.getElementById("feeds").style.width = "0%";
}

/* Open when someone clicks on the span element */
function openChat() {
    document.getElementById("chat").style.width = "70%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeChat() {
    document.getElementById("chat").style.width = "0%";
}

function openPost() {
  document.getElementById("post").style.height = "90%";
}

function closePost() {
  document.getElementById("post").style.height = "0%";
}


// Post msg to people around you
$('#postNear').keypress(function(event) {
  if (event.keyCode == 13 || event.which == 13) {
    if (!$('#postNear').val()) {
      alert("No Text");
    } else {
     var text = $('#postNear').val();
     $('.chat-history').prepend("<div class='chat-message clearfix'>\
        <img src='../Asset/Images/profile_pics/head_wisteria.png' width='32' height='32'>\
        <div class='chat-message-content clearfix'>\
        <span class='chat-time'>now</span>\
        <h5>You</h5>\
        <p> " + text + "<p></div></div> <hr>");

    $('#postNear').val("");

    }
  }
});

// Create a genral post
$('#general-post').click(function(){
  var title = $('#general-title');
  var subject = $('#general-subject');
  var content = $('#general-content');
  if (! title.val() || !subject.val() || !content.val()) {
    alert("Please fill out the form");
  } else {
    $("#midpost").prepend("<div class='filter general show'>\
    <div class='card' id='card-t'>\
    <div id='container'>\
    <img src='../Asset/general.svg' width='35' height='35' align='left' style='margin-right: 20px;'/>\
    <h2>" + title.val() + "</h2>\
    </div>\
    <h7 style='color: grey;'>now</h7>\
    <h4> Subject: "+ subject.val() + "</h4>\
    <p>" + content.val() + "</p>\
    <div align='right' class='bgroup'>\
    <button class='btn btn-outline-success'> <i class='fa fa-thumbs-up'></i> Like </button>\
    </div> </div> </div>");
    closePost();
  }

});
