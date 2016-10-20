var express = require('express')
var router = express.Router()

var User = require('../models/user')

router.get('/', function (req, res) {
  User.find({}, function (err, allUsers) {
    res.json(allUsers)
  })
})

router.get('/:id', function (req, res) {
  // res.send('requested id is ' + req.params.id)
  User.findOne({ '_id': req.params.id }, function (err, user) {
    res.json(user)
  })
})

router.post('/', function (req, res) {
  // res.json(req.body)
  User.create(req.body.user, function (err, savedUser) {
    console.log('new user created')
    res.json(savedUser)
  })
})

module.exports = router
