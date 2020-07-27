var express = require('express')
var router = express.Router()
var meetingDomain = require('../domain/meeting')

router.post('/add-meeting',async function(req,res){
    var addMeeting=await meetingDomain.insertMeeting(req.body);
    res.send(addMeeting);
})