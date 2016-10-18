var express = require('express')
var app = express()
var layout = require('express-ejs-layouts')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/donut-shop')

app.set('view engine', 'ejs')
app.use(layout)

// serve static files
app.use(express.static(__dirname + '/public'))

var frontendRoutes = require('./routes/donuts')
var ajaxRoutes = require('./routes/donuts_api')

app.use('/donuts', frontendRoutes) // only render ejs files
app.use('/api/donuts', ajaxRoutes) // only handle ajax request

app.listen(3000)
console.log('Server started')
