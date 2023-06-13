let register_form =  document.getElementById('register_form')
  register_form.addEventListener('submit', function(e) {
    e.preventDefault();
    const error_msgs = document.getElementsByClassName('error-msg');
    while(error_msgs.length > 0){
        error_msgs[0].parentNode.removeChild(error_msgs[0]);
    }

    let name = document.querySelector('[name="name"]').value;
    let email = document.querySelector('[name="email"]').value;
    let password = document.querySelector('[name="password"]').value;
    let cpassword = document.querySelector('[name="cpassword"]').value;
    let user_type = document.querySelector('[name="user_type"]').value;

    
    let errors = [];

    if(name.length == 0 ){
      errors.push('Name is required!')
    }else{
      errors.length = 0
    }

    let email_valid_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(email.length == 0 ){
      errors.push('Email is required!')
    } else if(!email.match(email_valid_regex)){
      errors.push('Invalid email address!')
    }else{
      errors.length = 0
    }
    
    if(password.length == 0 ){
      errors.push('Password is required!' )
    }else {
      errors.length = 0
    }

    if (password !== cpassword) {
      errors.push('Password not matched!')
    }else {
      errors.length = 0
    }

    if( errors.length !== 0 ){
      let form_title = document.getElementById('register_form').querySelectorAll('h3')[0];
      for (let index = 0; index < errors.length; index++) {
        form_title.insertAdjacentHTML("afterend", `<span class="error-msg"> ${errors[index]} </span>`);
      }
      errors.length = 0
    }

    let login_url = '/register_form.php';

    let register_form = {
      name,
      email,
      password,
      cpassword,
      user_type,
    }

    fetch(login_url, 
      { method: 'POST', 
        body: JSON.stringify(register_form), 
        mode: 'no-cors',
        creadentials: 'same-origin', 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials" : true 
        }, 
        mode: 'no-cors' })
    .then(function (response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        );
      }
      email = '';
      password = '';
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if(data.error_message){
        let form_title = document.getElementById('login_form').querySelectorAll('h3')[0];
        form_title.insertAdjacentHTML("afterend", `<span class="error-msg"> ${data.error_message} </span>`);

      } else if(data.success_message) {
        location.href = location.origin + "/login_form.php";  
      }
      console.log(data);
    })
    .catch(function (err) {
      let form_title = document.getElementById('login_form').querySelectorAll('h3')[0];
      form_title.insertAdjacentHTML("afterend", `<span class="error-msg"> ${err.message} </span>`);
      
      console.log('Fetch Error :-S', err);
    });
  
})