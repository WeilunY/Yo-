<?php
  session_start();
  $con = mysqli_connect("localhost", "root", "", "Yo"); // connect

  if(mysqli_connect_errno()){
    echo "Failed to connect: " . mysqli_connect_errono();
  }

  //Declaring Variables to prevent errors
  $fname = ""; // first name
  $lname = ""; // last name
  $em = ""; //email
  $em2 = ""; // email 2
  $password = ""; // password
  $password2 = ""; // password 2
  $date = ""; // Sign up dat
  $error_array = array(); // Holds error msgs

  if (isset($_POST['register_button'])) {

    //Registeration form value

    // Frst Name
    $fname = strip_tags($_POST['reg_fname']); // remove html tag
    $fname = str_replace(' ','',$fname); // replace space
    $fname = ucfirst(strtolower($fname)); // Uppercase first only
    $_SESSION['reg_fname'] = $fname; // Stores first name inton session

    // Last Name
    $lname = strip_tags($_POST['reg_lname']); // remove html tag
    $lname = str_replace(' ','',$lname); // replace space
    $lname = ucfirst(strtolower($lname)); // Uppercase first only
    $_SESSION['reg_lname'] = $lname;

    // email
    $em = strip_tags($_POST['reg_email']); // remove html tag
    $em = str_replace(' ','',$em); // replace space
    //$em = ucfirst(strtolower($em)); // Uppercase first only
    $_SESSION['reg_email'] = $em;

    // email2
    $em2 = strip_tags($_POST['reg_email2']); // remove html tag
    $em2 = str_replace(' ','',$em2); // replace space
    //$em2 = ucfirst(strtolower($em2)); // Uppercase first only
    $_SESSION['reg_email2'] = $em2;

    // Password
    $password = strip_tags($_POST['reg_password']); // remove html tag

    // Password 2
    $password2 = strip_tags($_POST['reg_password2']); // remove html tag

    //date
    $date = date("Y-m-d"); // Current date

    if($em == $em2) { // Check emails are the same
      // check if email is right format
      if (filter_var($em, FILTER_VALIDATE_EMAIL)) {

        $em = filter_var($em, FILTER_VALIDATE_EMAIL);

        // check if email already exist
        $e_check = mysqli_query($con, "SELECT email FROM users WHERE email = '$em'");

        // Count the number of rows returned
        $num_rows = mysqli_num_rows($e_check);

        if ($num_rows > 0) {
          array_push($error_array, "Email already in use <br>");
        }

      } else {
        array_push($error_array, "Invalid email Format <br>");
      }
    } else {
      array_push($error_array, "Email don't macth <br>");
    }

    if (strlen($fname) > 30 || strlen($fname) < 2) {
      array_push($error_array, "Your first name need to be between 2 and 30 characters <br>");
    }

    if (strlen($lname) > 30 || strlen($lname) < 2) {
      array_push($error_array, "Your Last name need to be between 2 and 30 characters <br>");
    }

    if ($password != $password2) {
      array_push($error_array, "Your passwords do not match <br>");
    } else {
      if(preg_match('/[^A-Za-z0-9]/', $password)){
        array_push($error_array, "Your password can only contain english character and numbers <br>");
      }
    }

    if(strlen($password > 30 || strlen($password) < 5)){
      array_push($error_array, "Your password must be between 5 and 30 characters <br>");
    }

    if (empty($error_array)) {
      $password = md5($password); // Encrypt password

      //Generate username by concatenating first and last name
      $username = strtolower($fname . "_" . $lname);
      $check_username_query = mysqli_query($con, "SELECT username FROM users Where username = '$username'");

      $i = 0;
      // if username exist add number to username
      while(mysqli_num_rows($check_username_query) != 0) {
        $i++; // add 1 to i
        $username = $username . "_" . $i;
        $check_username_query = mysqli_query($con, "SELECT username FROM users Where username = '$username'");
      }

      //Profile picture assignment

    }

  }
?>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
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

    </form>
  </body>
</html>
