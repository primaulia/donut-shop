var express = require('express')
var router = express.Router()

var Donut = require('../models/donut')

router.get('/', function (req, res) {
  Donut.find({}, function (err, allDonuts) {
    console.log(allDonuts)
    res.render('donuts/index', {
      allDonuts: allDonuts
    })
  })
})

module.exports = router
