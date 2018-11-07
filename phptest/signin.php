<?php
require '../config/config.php';
require '../includes/form_handler/register_handler.php';
require '../includes/form_handler/login_handler.php';
?>

<html lang = "en-US">
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link href="../CSS/signin.css" rel="stylesheet">
  <title> Yo! | Sign In </title>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #602060; position: fixed; top:0px; right:0px; width:100%;">
    <a class="navbar-brand"><img src="../logo/yo_v1-01.svg"width="35" height="35" alt="YO!"></a>
  </nav>
<div class="container">

  <form = "signin.php" method = "POST" class="form-signin" style="margin-top: 30px;">
    <h2 class="form-signin-heading">Please sign in</h2>
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" name="log_email" class="form-control" placeholder="Email address" value="<?php
    if(isset($_SESSION['log_email'])){
        echo $_SESSION['log_email'];
      }
    ?>" required autofocus>

    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" name="log_password" class="form-control" placeholder="Password"required>

    <div class="checkbox">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div>
    <input class="btn btn-primary btn-lg btn-block" type="submit" name="login_button" value="Login">
    <?php if(in_array("Email or password was incorrect<br>", $error_array)){
      echo "Email or password was incorrect<br>";
    } ?>
  </form>
  <a href="register.php">
    <button class="btn btn-secondary btn-block" style="margin-left: 40%;width:220px;">Sign Up</button>
  </a>


</div> <!-- /container -->
</body>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

</html>
