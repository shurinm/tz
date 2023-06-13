<?php

$conn = mysqli_connect('localhost','root','','user_db');

if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}

// sql to create user table
$user_sql = "CREATE TABLE IF NOT EXISTS user (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user VARCHAR(128) NOT NULL,
email VARCHAR(128) NOT NULL,
password VARCHAR(255) NOT NULL,
user_type VARCHAR(128) NOT NULL
)";

// sql to create tree table
$tree_sql = "CREATE TABLE IF NOT EXISTS tree (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  parent_id INT(6) UNSIGNED NOT NULL DEFAULT 0,
  name VARCHAR(128) NOT NULL,
  description VARCHAR(255) NOT NULL
  )";

if ( !mysqli_query($conn, $user_sql) || !mysqli_query($conn, $tree_sql) ) {
  echo "Error creating table: " . mysqli_error($conn);
}

