<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>user page</title>

   <!-- custom css file link  -->
   <link rel="stylesheet" href="css/style.css">
   <?php 
    @include 'tree.php';

    // if (!isset($_SESSION['user_name'])) {
    //   header("Location: login_form.php");
    // }
    ?>
</head>
<body>
   
<div class="container">

   <div class="content">
      <h3>hi, <span>user</span></h3>
      <h1>welcome <span id="user_type"><?php echo $_SESSION['user_name']; ?></span></h1>
      <p>this is an user page</p>
      <a href="#" class="btn">logout</a>
   </div>

   <div class="content tree">
    <h3>Dynamic tree</h3>

    <?php echo outTree($tree) ?>

   </div>

</div>
<script src="./js/user_page.js"></script>
</body>
</html>