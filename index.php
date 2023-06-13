<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<script>
  if(!sessionStorage.getItem("admin_name") || !sessionStorage.getItem("user_name")){
    location.href = location.origin + '/login_form.php';
  }
</script>
<body>
  
</body>
</html>

