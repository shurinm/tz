<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>admin page</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">
<?php 
@include 'tree.php';
// if (!isset($_SESSION['admin_name'])) {
//   header("Location: login_form.php");
// }
?>
</head>
<body>
   
<div class="container">

  <div class="content">
    <h3>hi, <span>admin</span></h3>
    <h1>welcome <span id="user_type"><?php echo $_SESSION['admin_name']; ?></span></h1>
    <p>this is an admin page</p>
    <a href="#" class="btn">logout</a>
  </div>

  <div class="content tree">
    <h3>Dynamic tree</h3>
    <button class="create-parent btn">Create element</button>
  
    <p>If you wont to edit list element you can simple click the element and make the update to the text immediately.</p>

    <?php echo outTree($tree) ?>


    <div class="form-container create-parent-form-container">
      <form action="" method="post" id="create_parent_form">
        <h3>Create element</h3>
        
        <input type="text" name="name" placeholder="enter list item name">
        <input type="text" name="description" placeholder="enter list item description">
        <input type="submit" name="submit" value="create" class="form-btn">
      </form>
    </div>

  </div>

</div>
<script src="./js/admin_page.js"></script>
</body>
</html>
