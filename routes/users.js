var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user')

router.get('/signup', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('users/index', {
      allUsers: allUsers
    })
  })
})

router.get('/signup-passport', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('users/index-passport', {
      allUsers: allUsers
    })
  })
})

router.post('/signup', function (req, res) {
  passport.authenticate('local-login', function (err, user, info) {

  })
})

router.get('/login', function (req, res) {
  res.render('users/login', { message: req.flash('loginMessage') })
})

router.post('/login', function (req, res) {
  var user = req.body.user

  User.findOne({ 'local.email': user.local.email }, function (err, foundUser) {
    if (err) res.send(err.message)

    if (foundUser) {
      foundUser.authenticate(user.local.password, function (err, authenticated) {
        if (err) res.send(err)

        if (authenticated) {
          res.redirect('/profile')
        } else {
          res.redirect('/login')
        }
      })
    } else {
      // if application cannot find user by email
      req.flash('loginMessage', 'Email not found!')
      res.redirect('/login')
    }
  })
})

router.get('/error', function (req, res) {
  res.render('users/error')
})

router.get('/profile', function (req, res) {
  res.render('users/profile')
})

module.exports = router
