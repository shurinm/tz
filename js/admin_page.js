// Logout
if(sessionStorage.getItem("admin_name")){
  document.getElementById('user_type').innerHTML =  sessionStorage.getItem("admin_name");
}else {
  location.href = location.origin + '/login_form.php';
}
 
let logout_btn = document.querySelectorAll('.btn')[0]
logout_btn.addEventListener('click', function (e) {
  sessionStorage.clear();
  location.href = location.origin + '/login_form.php';
})

// Create item 
let create_parent_btn = document.querySelector('.create-parent')
create_parent_btn.addEventListener('click', function (e) {
  document.querySelector('.create-parent-form-container').style.display = 'block'
})

let add_buttons = document.querySelectorAll(".add");
let parentId;

for (let i = 0; i < add_buttons.length; i++) {
  add_buttons[i].addEventListener("click", function(e) {
    e.preventDefault()
    parentId = e.target.parentElement.dataset.id
    document.querySelector('.create-parent-form-container').style.display = 'block'
  });
}

let create_parent_form = document.getElementById('create_parent_form');
create_parent_form.addEventListener('submit', function (e) {
  e.preventDefault();
  const error_msgs = document.getElementsByClassName('error-msg');
  while (error_msgs.length > 0) {
    error_msgs[0].parentNode.removeChild(error_msgs[0]);
  }
  let name = document.querySelector('[name="name"]').value;
  let description = document.querySelector('[name="description"]').value;
  let errors = [];

  if (name.length == 0) {
    errors.push('Name is required!');
  } else {
    errors.length = 0;
  }

  if (description.length == 0) {
    errors.push('Description is required!');
  } else {
    errors.length = 0;
  }

  if (errors.length !== 0) {
    let form_title = document.getElementById('create_parent_form').querySelectorAll('h3')[0];
    for (let index = 0; index < errors.length; index++) {
      form_title.insertAdjacentHTML(
        'afterend',
        `<span class="error-msg"> ${errors[index]} </span>`,
      );
    }
    errors.length = 0;
  }

  let create_list_item_url = '/create_list_item.php';

  let create_parent_form = {
    id: parentId || 0,
    name,
    description,
  };

  fetch(create_list_item_url, {
    method: 'POST',
    body: JSON.stringify(create_parent_form),
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
    name = '';
    description = '';
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    if (data.error_message) {
      let form_title = document.getElementById('create_parent_form').querySelectorAll('h3')[0];
      form_title.insertAdjacentHTML(
        'afterend',
        `<span class="error-msg"> ${data.error_message} </span>`,
      );
    } else {
      document.querySelector('.create-parent-form-container').style.display = 'none'
      if(data.success_message){   
        document.querySelector(".list").insertAdjacentHTML(
          'afterend',
          `<span class="error-msg"> ${data.success_message} </span>`,
        );
        setTimeout(function () {
          document.querySelector(".error-msg").style.display = 'none'
          location.reload()
        }, 1000);
      }
    }
  }) 
  .catch(function (err) {
    let form_title = document.getElementById('create_parent_form').querySelectorAll('h3')[0];
    form_title.insertAdjacentHTML('afterend', `<span class="error-msg"> ${err.message} </span>`);

    console.log('Fetch Error :-S', err);
  });
});

// Remove item

let remove_buttons = document.querySelectorAll(".remove");
let id;

for (let i = 0; i < remove_buttons.length; i++) {
  remove_buttons[i].addEventListener("click", function(e) {
    e.preventDefault();
    id = e.target.parentElement.dataset.id;
    
    let remove_item_url = '/remove_item.php'
    fetch(remove_item_url, {
      method: 'POST',
      body: JSON.stringify({id}),
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
      return response.json();
    })
    .then(function (data) {
      if (data.error_message) {
        document.querySelector(".list").insertAdjacentHTML(
          'afterend',
          `<span class="error-msg"> ${data.error_message} </span>`,
        );
      } else {
        if(data.success_message){   
          document.querySelector(".list").insertAdjacentHTML(
            'afterend',
            `<span class="error-msg"> ${data.success_message} </span>`,
          );
          setTimeout(function () {
            document.querySelector(".error-msg").style.display = 'none'
            location.reload()
          }, 1000);
        }
      }
    }) 
    .catch(function (err) {
      document.querySelector(".list").insertAdjacentHTML('afterend', `<span class="error-msg"> ${err.message} </span>`);
      console.log('Fetch Error :-S', err);
    });
  });
}

// Update item name

let contents = document.querySelectorAll('[contenteditable]');
  let parent_id;
  for (let i = 0; i < contents.length; i++) {
    contents[i].addEventListener("input", function(e) {
      parent_id = e.target.parentElement.dataset.id
      let name = e.target.innerHTML

      let update_item_url = '/update_item.php';

      let update_data = {
        id: parent_id ,
        name,
      };
      setTimeout(() => {
        fetch(update_item_url, {
          method: 'POST',
          body: JSON.stringify(update_data),
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
          return response.json();
        })
        .then(function (data) {
          if (data.error_message) {
            document.querySelector(".list").insertAdjacentHTML(
              'afterend',
              `<span class="error-msg"> ${data.error_message} </span>`,
            );
          } else {
            if(data.success_message){   
              document.querySelector(".list").insertAdjacentHTML(
                'afterend',
                `<span class="error-msg"> ${data.success_message} </span>`,
              );
              setTimeout(function () {
                document.querySelector(".error-msg").style.display = 'none'
                location.reload()
              }, 3000);
            }
          }
        }) 
        .catch(function (err) {
          document.querySelector(".list").insertAdjacentHTML('afterend', `<span class="error-msg"> ${err.message} </span>`);
          console.log('Fetch Error :-S', err);
        });
      }, 1000);
    });
  }