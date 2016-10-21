var express = require('express')
var router = express.Router()
var passport = require('passport')

var User = require('../models/user')

function authCheck (req, res, next) {
  // if req.isAuthenticated is false, then let it be

  // if it's true, redirect back to profile

  if (req.isAuthenticated()) {
    req.flash('signupMessage', 'You have logged in, what are you doing bruh?')
    return res.redirect('/profile')
  } else {
    return next()
  }
}

router.get('/signup-ajax', function (req, res) {
  User.find({}, function (err, allUsers) {
    console.log(allUsers)
    res.render('users/index', {
      allUsers: allUsers
    })
  })
})

router.route('/signup')
      .get(authCheck, function (req, res) {
        User.find({}, function (err, allUsers) {
          console.log(allUsers)
          res.render('users/index-passport', {
            allUsers: allUsers,
            message: req.flash('signupMessage')
          })
        })
      })
      .post(passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
      }))

router.route('/login')
      .get(function (req, res) {
        res.render('users/login', { message: req.flash('loginMessage') })
      })
      .post(function (req, res) {
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
  res.render('users/profile', { message: req.flash('signupMessage') })
})

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/signup')
})

module.exports = router
