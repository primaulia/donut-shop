$(document).ready(function ($) {
  var $userForm = $('.new-user')

  $userForm.on('submit', function (e) {
    e.preventDefault()
    // console.log($(this).serializeArray())
    var formdata = $(this).serializeArray()


    // console.log(data[0].name)

    var user_name = $('#user-name').val()
    var user_password = $('#user-password').val()
    var user_email = $('#user-email').val()

    console.log(user_name, user_password, user_email)
    alert('ajax call now')
    $.ajax({
      type: 'POST',
      url: '/api/users',
      data: formdata
    }).done(doSomething)
  })

  function doSomething (data) {
    alert('form submitted, new users created')
    alert(data)
    $('#all-user-list').append('<li>' + data.name + data.email + data.password +'</li>')
  }
})
