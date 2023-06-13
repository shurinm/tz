<?php
@include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
if(isset($data['name']) && isset($data['id'])){

  $name = $data['name'];
  $parent_id = $data['id'];

  $update = "UPDATE tree SET name='" . $name . "' WHERE id='" . $parent_id . "';";

   if(mysqli_query($conn, $update)){
    $success_message = ['success_message' => 'Element updated successfully!'];
    $json_message = json_encode($success_message);
    die($json_message);
   } else {
    $error_message = ['error_message' => 'Something went wrong try again!'];
    $json_message = json_encode($error_message);
    die($json_message);
   }

}

