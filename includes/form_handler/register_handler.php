<?php
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
      $rand = rand(1, 5); // random btween 1 and 5
      switch ($rand) {
        case 1:
          $profile_pic = "../Asset/Images/profile_pics/deafaults/head_alizarin.png";
          break;
        case 2:
          $profile_pic = "../Asset/Images/profile_pics/deafaults/head_emerald.png";
          break;
        case 3:
          $profile_pic = "../Asset/Images/profile_pics/deafaults/head_wisteria.png";
          break;
        case 4:
          $profile_pic = "../Asset/Images/profile_pics/deafaults/head_wet_asphalt.png";
          break;
        default:
          $profile_pic = "../Asset/Images/profile_pics/deafaults/head_deep_blue.png";
          break;
      }

      // Send to data base
      $query = mysqli_query($con, "INSERT INTO users VALUES ('', '$fname', '$lname', '$username', '$em', '$password', '$date', '$profile_pic', '0', '0', 'no', ',')");

      array_push($error_array, "<span style='color: #602060;'>You're all set! Goahead and login!</span><br>");

      // Clear Session Variabl
      $_SESSION['reg_fname'] = "";
      $_SESSION['reg_lname'] = "";
      $_SESSION['reg_email'] = "";
      $_SESSION['reg_email2'] = "";
      header("Location: signin.php");
  		exit();
    }

  }
 ?>
