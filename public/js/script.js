$(document).ready(function ($) {
  var $userForm = $('.new-user')

  $userForm.on('submit', function (e) {
    e.preventDefault()
    var formdata = $(this).serializeArray()

    window.alert('ajax call now')
    $.post({
      url: '/api/users',
      data: formdata
    }).done(doSomething)
  })

  function doSomething (data) {
    window.alert('form submitted, new users created')
    $('#all-user-list').append('<li>' + data.name + data.email + data.password + '</li>')
  }
})
