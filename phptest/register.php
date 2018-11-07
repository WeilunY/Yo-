<?php
  require '../config/config.php';
  require '../includes/form_handler/register_handler.php';
  require '../includes/form_handler/login_handler.php';
?>

<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <form = "register.php" method = "POST">
      <input type="email" name="log_email" placeholder="Email Address" value="<?php
      if(isset($_SESSION['log_email'])){
          echo $_SESSION['log_email'];
        }
      ?>" required>
      <br>
      <input type="password" name="log_password" placeholder="Password">
      <br>
      <input type="submit" name="login_button" value="Login">
      <?php if(in_array("Email or password was incorrect<br>", $error_array)) echo "Email or password was incorrect<br>"; ?>
    </form>

    <form action="register.php" method="POST">
      <input type="text" name="reg_fname" placeholder="First Name" value="<?php
      if(isset($_SESSION['reg_fname'])){
          echo $_SESSION['reg_fname'];
        }
      ?>" required>
      <br>
      <?php if(in_array("Your first name need to be between 2 and 30 characters <br>", $error_array)){
        echo "Your first name need to be between 2 and 30 characters <br>";
      } ?>

      <input type="text" name="reg_lname" placeholder="Last Name" value="<?php
      if(isset($_SESSION['reg_lname'])){
          echo $_SESSION['reg_lname'];
        }
      ?>" required>
      <br>
      <?php if(in_array("Your Last name need to be between 2 and 30 characters <br>", $error_array)){
        echo "Your Last name need to be between 2 and 30 characters <br>";
      } ?>

      <input type="email" name="reg_email" placeholder="Email" value="<?php
      if(isset($_SESSION['reg_email'])){
          echo $_SESSION['reg_email'];
        }
      ?>" required>
      <br>
      <?php if(in_array("Email already in use <br>", $error_array)){
        echo "Email already in use <br>";
      }
      else if(in_array("Invalid email Format <br>", $error_array)){
        echo "Invalid email Format <br>";
      }
      else if(in_array("Email don't macth <br>", $error_array)){
        echo "Email don't macth <br>";
      } ?>

      <input type="email" name="reg_email2" placeholder="Confirm Email" value="<?php
      if(isset($_SESSION['reg_email2'])){
          echo $_SESSION['reg_email2'];
        }
      ?>" required>
      <br>
      <?php if(in_array("Email already in use <br>", $error_array)){
        echo "Email already in use <br>";
      }
      else if(in_array("Invalid email Format <br>", $error_array)){
        echo "Invalid email Format <br>";
      }
      else if(in_array("Email don't macth <br>", $error_array)){
        echo "Email don't macth <br>";
      } ?>

      <input type="password" name="reg_password" placeholder="Password" required>
      <br>
      <?php if(in_array("Your passwords do not match <br>", $error_array)){
        echo "Your passwords do not match <br>";
      }
      else if(in_array("Your password can only contain english character and numbers <br>", $error_array)){
        echo "Your password can only contain english character and numbers <br>";
      }
      else if(in_array("Your password must be between 5 and 30 characters <br>", $error_array)){
        echo "Your password must be between 5 and 30 characters <br>";
      } ?>

      <input type="password" name="reg_password2" placeholder="Confirm Password" required>
      <br>
      <?php if(in_array("Your passwords do not match <br>", $error_array)){
        echo "Your passwords do not match <br>";
      }
      else if(in_array("Your password can only contain english character and numbers <br>", $error_array)){
        echo "Your password can only contain english character and numbers <br>";
      }
      else if(in_array("Your password must be between 5 and 30 characters <br>", $error_array)){
        echo "Your password must be between 5 and 30 characters <br>";
      } ?>

      <input type="submit" name="register_button" value="Register">
      <?php if(in_array("<span style='color: #602060;'>You're all set! Goahead and login!</span><br>", $error_array)){
        echo "<span style='color: #602060;'>You're all set! Goahead and login!</span><br>";
      } ?>

    </form>
  </body>
</html>
