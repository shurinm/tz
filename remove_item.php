<?php
@include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
if(isset($data['id'])){
  $id = $data['id'];

  $delete = "DELETE FROM tree WHERE id='". $id ."' OR parent_id='" . $id . "';";

  if(mysqli_query($conn, $delete)){
    $success_message = ['success_message' => 'Element deleted successfully!'];
    $json_message = json_encode($success_message);
    die($json_message);
  } else {
    $error_message = ['error_message' => 'Something went wrong try again!'];
    $json_message = json_encode($error_message);
    die($json_message);
  }
}

