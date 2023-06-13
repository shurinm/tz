<?php

@include 'config.php';

session_start();
$data = json_decode(file_get_contents('php://input'), true);
if(isset($data['email']) && isset($data['password'])){

  $email = $data['email'];
  $password = $data['password'];
  $cpass = md5($password);

   $select = " SELECT * FROM user WHERE email = '$email' && password = '$cpass' ";

   $result = mysqli_query($conn, $select);

   if(mysqli_num_rows($result) > 0){

      $row = mysqli_fetch_array($result);

      if($row['user_type'] == 'admin'){
        $_SESSION["admin_name"] = 'admin';
        $admin_name = ['admin_name' => 'admin'];
        $json_message = json_encode($admin_name);
        die($json_message);

      }elseif($row['user_type'] == 'user'){
        $_SESSION["user_name"] = 'user';
        $user_name = ['user_name' => 'user'];
        $json_message = json_encode($user_name);
        die($json_message);
      }
     
   }else{
    $error_message = ['error_message' => 'incorrect email or password!'];
    $json_message = json_encode($error_message);
    die($json_message);
  }
  
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>login form</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<div class="form-container">

   <form action="" method="post" id="login_form">
      <h3>login now</h3>
     
      <input type="email" name="email" placeholder="enter your email">
      <input type="password" name="password" placeholder="enter your password">
      <input type="submit" name="submit" value="login now" class="form-btn">
      <p>don't have an account? <a href="register_form.php">register now</a></p>
   </form>

</div>
<script src="./js/login_form.js"></script>
</body>
</html>