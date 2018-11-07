<?php
  require '../config/config.php';
  require '../includes/form_handler/register_handler.php';
?>

<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Yo! | Sign Up</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link href="../CSS/signin.css" rel="stylesheet">
  </head>
  <body>
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #602060; position: fixed; top:0px; right:0px; width:100%;">
      <a class="navbar-brand"><img src="../logo/yo_v1-01.svg"width="35" height="35" alt="YO!"></a>
    </nav>

    <div class="container" style=" max-width: 1000px; margin: auto; margin-top: 60px;">
      <h2> Sign Up For Yo! </h2>

      <form action="register.php" method="POST" style="margin-top: 40px;">

        <div class="form-group row">
           <label for="inputfname" class="col-sm-2 col-form-label">First Name</label>
           <div class="col-sm-10">
              <input type="text" name="reg_fname" placeholder="First Name" class="form-control" id="inputfname" value="<?php
              if(isset($_SESSION['reg_fname'])){
                  echo $_SESSION['reg_fname'];
                }
              ?>" required>
              <?php if(in_array("Your first name need to be between 2 and 30 characters <br>", $error_array)){
                echo "Your first name need to be between 2 and 30 characters <br>";
              } ?>
            </div>
        </div>

        <div class="form-group row">
           <label for="inputlname" class="col-sm-2 col-form-label">Last Name</label>
           <div class="col-sm-10">
                <input type="text" name="reg_lname" placeholder="Last Name" class="form-control" id="inputlname" value="<?php
                if(isset($_SESSION['reg_lname'])){
                    echo $_SESSION['reg_lname'];
                  }
                ?>" required>

                <?php if(in_array("Your Last name need to be between 2 and 30 characters <br>", $error_array)){
                  echo "Your Last name need to be between 2 and 30 characters <br>";
                } ?>
            </div>
        </div>

        <div class="form-group row">
           <label for="inputemail" class="col-sm-2 col-form-label">Email</label>
           <div class="col-sm-10">
              <input type="email" name="reg_email" placeholder="Email" class="form-control" id="inputemail" value="<?php
              if(isset($_SESSION['reg_email'])){
                  echo $_SESSION['reg_email'];
                }
              ?>" required>

              <?php if(in_array("Email already in use <br>", $error_array)){
                echo "Email already in use <br>";
              }
              else if(in_array("Invalid email Format <br>", $error_array)){
                echo "Invalid email Format <br>";
              }
              else if(in_array("Email don't macth <br>", $error_array)){
                echo "Email don't macth <br>";
              } ?>
            </div>
          </div>

        <div class="form-group row">
           <label for="inputemail2" class="col-sm-2 col-form-label">Confirm Email</label>
           <div class="col-sm-10">
              <input type="email" name="reg_email2" placeholder="Confirm Email" class="form-control" id="inputemail2" value="<?php
              if(isset($_SESSION['reg_email2'])){
                  echo $_SESSION['reg_email2'];
                }
              ?>" required>

              <?php if(in_array("Email already in use <br>", $error_array)){
                echo "Email already in use <br>";
              }
              else if(in_array("Invalid email Format <br>", $error_array)){
                echo "Invalid email Format <br>";
              }
              else if(in_array("Email don't macth <br>", $error_array)){
                echo "Email don't macth <br>";
              } ?>
            </div>
          </div>

        <div class="form-group row">
            <label for="inputpassword" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input type="password" name="reg_password" placeholder="Password" class="form-control" id="inputpassword" required>

              <?php if(in_array("Your passwords do not match <br>", $error_array)){
                echo "Your passwords do not match <br>";
              }
              else if(in_array("Your password can only contain english character and numbers <br>", $error_array)){
                echo "Your password can only contain english character and numbers <br>";
              }
              else if(in_array("Your password must be between 5 and 30 characters <br>", $error_array)){
                echo "Your password must be between 5 and 30 characters <br>";
              } ?>
            </div>
          </div>

        <div class="form-group row">
            <label for="inputpassword2" class="col-sm-2 col-form-label">Confirm Password</label>
            <div class="col-sm-10">
              <input type="password" name="reg_password2" placeholder="Confirm Password" class="form-control" id="inputpassword2" required>
              <?php if(in_array("Your passwords do not match <br>", $error_array)){
                echo "Your passwords do not match <br>";
              }
              else if(in_array("Your password can only contain english character and numbers <br>", $error_array)){
                echo "Your password can only contain english character and numbers <br>";
              }
              else if(in_array("Your password must be between 5 and 30 characters <br>", $error_array)){
                echo "Your password must be between 5 and 30 characters <br>";
              } ?>
            </div>
          </div>

          <input type="submit" name="register_button" class="btn btn-primary btn-block" value="Sign Up">
          <?php if(in_array("<span style='color: #602060;'>You're all set! Goahead and login!</span><br>", $error_array)){
            echo "<span style='color: #602060;'>You're all set! Goahead and login!</span><br>";
          } ?>


      </form>
    </div>
  </body>
</html>
