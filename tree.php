<?php
@include 'config.php';
session_start();
$user_type = $_SESSION['admin_name'] ? $_SESSION['admin_name'] : $_SESSION['user_name'];

$select_data = "SELECT * FROM tree ";
$result = mysqli_query($conn, $select_data);

$data = [];
while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
  $data[] = $row;
}

function buildTree(array $elements, $parentId = 0) {
  $branch = array();

  foreach ($elements as $element) {
      if ($element['parent_id'] == $parentId) {
          $children = buildTree($elements, $element['id']);
          if ($children) {
              $element['children'] = $children;
          }
          $branch[] = $element;
      }
  }
  return $branch;
}

function outTree($tree) {
  $markup = '';
  global $user_type;
  if($user_type == 'user') {
    foreach($tree as $key => $value) {
      $markup .= '<li data-id="'. $value['id'] .'">'. ((array_key_exists('children', $value)) ? '<span>' . $value['name'] . '</span>' . outTree($value['children']) : '<span>' . $value['name' ]. '</span>' ) .'</li>';
    }
  }else {
    foreach($tree as $key => $value) {
      $markup .= '<li data-id="'. $value['id'] .'">'. ((array_key_exists('children', $value)) ? '<span contenteditable="true">' . $value['name'] . '</span>' . '<a href="#" class="add">Add</a> <a href="#" class="remove">Remove</a>' . outTree($value['children']) : '<span contenteditable="true">' . $value['name' ]. '</span>' . '<a href="#" class="add">Add</a> <a href="#" class="remove">Remove</a>' ) .'</li>';
    }
  }
  return '<ul class="list">'. $markup .'</ul>';
}

$tree = buildTree($data);