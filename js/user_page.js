if(sessionStorage.getItem("user_name")){
  document.getElementById('user_type').innerHTML =  sessionStorage.getItem("user_name");
}else {
  location.href = location.origin + '/login_form.php';
}

let logout_btn = document.querySelectorAll('.btn')[0]
logout_btn.addEventListener('click', function (e) {
  sessionStorage.clear();
  location.href = location.origin + '/login_form.php';
})