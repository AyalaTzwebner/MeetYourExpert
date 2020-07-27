var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('public'))


console.log("server 1")
var usersAction = require('./action/user')
var cityAction = require('./action/city')
var subjectAction = require('./action/profession')
var expertAction = require('./action/expert')
var recommendAction = require('./action/recommend')
var meetingAction=require('./action/meeting')
app.use('/users', usersAction);
app.use('/cities', cityAction);
app.use('/subjects', subjectAction);
app.use('/experts', expertAction);
app.use('/recommend', recommendAction);
app.use('/meetings', recommendAction);
app.get('/', (req, res) => res.send('Api Meet Your Expert'))
module.exports = app