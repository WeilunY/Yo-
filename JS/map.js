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
  document.getElementById("generalPost").style.height = "90%";
}

function closePost() {
  document.getElementById("generalPost").style.height = "0%";
}

function openPost1() {
  document.getElementById("academicPost").style.height = "90%";
}

function closePost1() {
  document.getElementById("academicPost").style.height = "0%";
}

function openPost2() {
  document.getElementById("eventPost").style.height = "90%";
}

function closePost2() {
  document.getElementById("eventPost").style.height = "0%";
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

var numPost = 6;

// Create a genral post
$('#general-post').click(function(){
  var title = $('#general-title');
  var content = $('#general-content');
  if (! title.val() || !content.val()) {
    alert("Please fill out the form");
  } else {
    $("#midpost").prepend("<div class='filter general show'>\
    <div class='card' id='card-t'>\
    <div id='container'>\
    <img src='../Asset/general.svg' width='35' height='35' align='left' style='margin-right: 20px;'/>\
    <h2>" + title.val() + "</h2>\
    </div>\
    <h6> by You </h6>\
    <h7 style='color: grey; margin-bottom: 12px;'>now</h7>\
    <p>" + content.val() + "</p>\
    <div align='right' class='bgroup'>\
    <button class='btn btn-outline-success'> <i class='fa fa-thumbs-up'></i> Like </button>\
    <button class='btn btn-outline-primary' onclick='typeComment( " + numPost + " )'> <i class='fa fa-comment'></i> Comment </button>\
    <div id='type" + numPost  + "' style='display: none;'>\
    <textarea class='form-control comment' id='content' rows='4' placeholder='Add your comment...''></textarea>\
    </div>\
    </div> </div> </div>");

    numPost += 1;

    closePost();

    title.val("");
    subject.val("");
    content.val("");
  }
});

// Create academic
$('#academic-post').click(function(){
  var title = $('#academic-title');
  var subject = $('#academic-subject')
  var content = $('#academic-content');
  if (! title.val() || !content.val() || !subject.val()) {
    alert("Please fill out the form");
  } else {
    $("#midpost").prepend("<div class='filter academic show'>\
    <div class='card' id='card-t'>\
    <div id='container'>\
    <img src='../Asset/academic.svg' width='35' height='35' align='left' style='margin-right: 20px;'/>\
    <h2>" + title.val() + "</h2>\
    </div>\
    <h6> by You </h6>\
    <h7 style='color: grey; margin-bottom: 12px;'>now</h7>\
    <h4> Subject: " + subject.val() + "</h4>\
    <p>" + content.val() + "</p>\
    <div align='right' class='bgroup'>\
    <button class='btn btn-outline-success'> <i class='fa fa-thumbs-up'></i> Like </button>\
    <button class='btn btn-outline-primary' onclick='typeComment( " + numPost + " )'> <i class='fa fa-comment'></i> Comment </button>\
    <div id='type" + numPost  + "' style='display: none;'>\
    <textarea class='form-control comment' id='content' rows='4' placeholder='Add your comment...''></textarea>\
    </div>\
    </div> </div> </div>");

    numPost += 1;

    closePost1();

    title.val("");
    subject.val("");
    content.val("");
  }
});

// Create an event post
$('#event-post').click(function(){
  var title = $('#event-title');
  var location = $('#event-location');
  var time = $('#event-date');
  var description = $('#event-description');

  if(!title.val() || !location.val() || !time.val() || !description.val()){
    alert("Please fill out all the forms 2");
  } else {
    $("#midpost").prepend("<div class='filter event show'>\
    <div class='card' id='card-t'>\
    <div id='container'>\
    <img src='../Asset/event.svg' width='35' height='35' align='left' style='margin-right: 20px;'/>\
    <h2>" + title.val() + "</h2>\
    </div>\
    <h6> by You </h6>\
    <h7 style='color: grey; margin-bottom: 12px;'>now</h7>\
    <h4> Location @  "+ location.val() + "</h4>\
    <h5> Date: "+ time.val() + "</h5>\
    <p>" + description.val() + "</p>\
    <div align='right' class='bgroup'>\
    <button class='btn btn-outline-success'> <i class='fa fa-thumbs-up'></i> Like </button>\
    <button class='btn btn-outline-primary' onclick='typeComment( " + numPost + " )'> <i class='fa fa-comment'></i> Comment </button>\
    <div id='type" + numPost  + "' style='display: none;'>\
    <textarea class='form-control comment' id='content' rows='4' placeholder='Add your comment...''></textarea>\
    </div>\
    </div> </div> </div>");

    numPost += 1;

    closePost2();

    title.val("");
    location.val("");
    time.val("");
    content.val("");
  }
});
