let login_form = document.getElementById('login_form');
login_form.addEventListener('submit', function (e) {
  e.preventDefault();
  const error_msgs = document.getElementsByClassName('error-msg');
  while (error_msgs.length > 0) {
    error_msgs[0].parentNode.removeChild(error_msgs[0]);
  }
  let email = document.querySelector('[name="email"]').value;
  let password = document.querySelector('[name="password"]').value;
  let errors = [];

  let email_valid_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (email.length == 0) {
    errors.push('Email is required!');
  } else if (!email.match(email_valid_regex)) {
    errors.push('Invalid email address!');
  } else {
    errors.length = 0;
  }

  if (password.length == 0) {
    errors.push('Password is required!');
  } else {
    errors.length = 0;
  }

  if (errors.length !== 0) {
    let form_title = document.getElementById('login_form').querySelectorAll('h3')[0];
    for (let index = 0; index < errors.length; index++) {
      form_title.insertAdjacentHTML(
        'afterend',
        `<span class="error-msg"> ${errors[index]} </span>`,
      );
    }
    errors.length = 0;
  }

  let login_url = '/login_form.php';

  let login_form = {
    email,
    password,
  };

  fetch(login_url, {
    method: 'POST',
    body: JSON.stringify(login_form),
    mode: 'no-cors',
    creadentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    mode: 'no-cors',
  })
    .then(function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' + response.status);
      }
      email = '';
      password = '';
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.user_name) {
        sessionStorage.setItem('user_name', data.user_name);
        location.href = location.origin + '/user_page.php';
      } else if (data.admin_name) {
        sessionStorage.setItem('admin_name', data.admin_name);
        location.href = location.origin + '/admin_page.php';
      } else if (data.error_message) {
        let form_title = document.getElementById('login_form').querySelectorAll('h3')[0];
        form_title.insertAdjacentHTML(
          'afterend',
          `<span class="error-msg"> ${data.error_message} </span>`,
        );
      }
      console.log(data);
  }) 

    .catch(function (err) {
      let form_title = document.getElementById('login_form').querySelectorAll('h3')[0];
      form_title.insertAdjacentHTML('afterend', `<span class="error-msg"> ${err.message} </span>`);

      console.log('Fetch Error :-S', err);
    });
});
