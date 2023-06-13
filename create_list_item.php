<?php
@include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
if(isset($data['name']) && isset($data['description']) && isset($data['id'])){

  $name = $data['name'];
  $description = $data['description'];
  $parent_id = $data['id'];

  $insert = "INSERT INTO tree (parent_id, name, description)
  VALUES ('". $parent_id ."', '". $name . "', '" . $description . "');";

   if(mysqli_query($conn, $insert)){
    $success_message = ['success_message' => 'Element created successfully!'];
    $json_message = json_encode($success_message);
    die($json_message);
   } else {
    $error_message = ['error_message' => 'Something went wrong try again!'];
    $json_message = json_encode($error_message);
    die($json_message);
   }

}

