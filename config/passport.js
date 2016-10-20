var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, email, password, next) {
  // the authentication flow on our local auth routes

  User.findOne({'local.email': email }, function (err, foundUser) {
    // if user is found, dont create new user
    // if user is not found, create new user

    if (err) return next(err)

    if (user) {
      return next(null, false, req.flash('signupMessage', 'Email has been taken'))
    } else {
      var newUser = new User()

      newUser = {
        local: {
          email: email,
          password: password
        }
      })

      newUser.save(function (err, newUser) {
        if (err) throw err

        return next(null, newUser)
      })
    }
  })
}))
