/* Open when someone clicks on the span element */
function openFeeds() {
    document.getElementById("feeds").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeFeeds() {
    document.getElementById("feeds").style.width = "0%";
}

/* Open when someone clicks on the span element */
function openChat(name) {
    document.getElementById("chat").style.width = "70%";

    totalChat += 1;
    currentChat = totalChat;

    // create a chatlist var
    $(".inbox_chat").prepend('<div class="chat_list" id="chat_name'+ totalChat +'">\
    <div class="chat_people" onclick="switchChat('+ totalChat +')">\
    <div class="chat_img"> <img src="img_avatar.png" alt="sunil"> </div>\
    <div class="chat_ib">\
    <h5>'+ name +'<span class="chat_date">Now</span></h5>\
    <p>Now you can start chatting with '+ name +'</p>\
    </div></div></div>'
    );

    // chat history
    $(".mesgs").prepend('<div class="msg_history"  id="chat_history'+ totalChat +'">\
    <div class="incoming_msg">\
    <div class="incoming_msg_img"> <img src="img_avatar.png" alt="sunil"> </div>\
    <div class="received_msg">\
    <div class="received_withd_msg">\
    <p>Now you can start chatting with '+name+'</p>\
    <span class="time_date"> Now   |   Today</span></div>\
    </div></div></div>');

    switchChat(totalChat);
}

function openChat1(){
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

function openSignin(){
  closePost();
  closePost1();
  closePost2();
  closeFeeds();
  closeChat();
  document.getElementById("signin").style.height = "100%";
}

var email = "";
var password = "";

function closeSignin() {
  var error = "";
  if(!$("#inputEmail").val()){
    error = error + "Please fill in your email \n";
  }

  if(!$("#inputPassword").val()){
    error = error + "Please fill in your password \n";
  }

  if(error != ""){
    alert(error);
  }

  else{
    document.getElementById("signin").style.height = "0%";
    $("#inputEmail").val("");
    $("#inputPassword").val("");
  }
}

function openSignup(){
  document.getElementById("signup").style.height = "100%";
}

function closeSignup(){
  var error = "";

  if(!$("#inputfname").val()){
    error = error + "Please fill in your first name \n";
  }

  if(!$("#inputlname").val()){
    error = error + "Please fill in your last name \n";
  }

  document.getElementById("signup").style.height = "0%";
}

// post comment
function postComment(num){
  var id = "#c" + num;
  var commentID = "#comment" + num;
  if (!$(id).val()){
    alert("No Comment")
  } else {
    var text = $(id).val();
    if(confirm("Are you ready to post " + text + "?")){
      $(commentID).prepend('<div class="a_comment">\
      <div class="person">\
      <img src="../Asset/Images/profile_pics/head_wisteria.png"\
      style="height:45px; width:45px ;border-radius: 100px;">\
      </div>\
      <div class="comment_content">\
        <p id="comment_name"> You </p>\
        <p id="comment_stuff">' + text + '</p>\
        </div>\
        <div style="clear:both;"></div>\
      </div>'
      )

      $(id).val("");
  }
  }
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
    </div> </div> </div>");

    numPost += 1;

    closePost2();

    title.val("");
    location.val("");
    time.val("");
    content.val("");
  }
});

var totalChat = 2;
var currentChat = 1;

// Switch chat
function switchChat(n){
  currentChat = n;
  // set current active
  $("#chat_name" + n).addClass("active_chat");

  // Remove active
  for(i = 1; i <= totalChat; i++){
    if(i != n && $("#chat_name" + i).hasClass("active_chat")){
      $("#chat_name" + i).removeClass("active_chat");
    }
  }

  $("#chat_history" + n).css("display","block");

  for(i = 1; i <= totalChat; i++){
    if (i != n){
      $("#chat_history" + i).css("display","none");
    }
  }

}

// Send chat
$(".write_msg").keypress(function(event) {
  if (event.keyCode == 13 || event.which == 13) {
    if(!$(".write_msg").val()){
      alert("Please type your message");
    } else {
      var msg = $(".write_msg").val();
      $("#chat_history" + currentChat).append(
        '<div class="outgoing_msg">\
          <div class="sent_msg">\
          <p>' + msg + '</p>\
            <span class="time_date"> Now    |    Today</span> </div>\
            </div> </div>  '
      );
      $(".write_msg").val("");
    }
  }
});
