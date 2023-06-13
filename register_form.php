<?php

@include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if( isset($data['name']) && 
    isset($data['email']) && 
    isset($data['password']) && 
    isset($data['cpassword']) && 
    isset($data['user_type']) ){

   $name = $data['name'];
   $email = $data['email'];
   $pass = md5($data['password']);
   $cpass = md5($data['cpassword']);
   $user_type = $data['user_type'];

   $select = " SELECT * FROM user WHERE email = '$email' && password = '$pass' ";

   $result = mysqli_query($conn, $select);

   if(mysqli_num_rows($result) > 0){
    $error_message = ['error_message' => 'User already exist!'];
    $json_message = json_encode($error_message);
    die($json_message);
   }else{

    $insert = "INSERT INTO user(name, email, password, user_type) VALUES('$name','$email','$pass','$user_type')";
    mysqli_query($conn, $insert);
    $success_message = ['success_message' => 'You are registered successfully.'];
    $json_message = json_encode($success_message);
    die($json_message);
   }

};


?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>register form</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">

</head>
<body>
   
<div class="form-container">

   <form action="" method="post" id="register_form">
      <h3>register now</h3>
      
      <input type="text" name="name" placeholder="enter your name">
      <input type="email" name="email" placeholder="enter your email">
      <input type="password" name="password" placeholder="enter your password">
      <input type="password" name="cpassword" placeholder="confirm your password">
      <select name="user_type">
         <option value="user">user</option>
         <option value="admin">admin</option>
      </select>
      <input type="submit" name="submit" value="register now" class="form-btn">
      <p>already have an account? <a href="login_form.php">login now</a></p>
   </form>

</div>
<script src="./js/register_form.js"></script>
</body>
</html>