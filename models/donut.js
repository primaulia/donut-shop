var mongoose = require('mongoose')

var donutSchema = new mongoose.Schema({
  flavor: String,
  type: String
})

var Donut = mongoose.model('Donut', donutSchema)

module.exports = Donut
