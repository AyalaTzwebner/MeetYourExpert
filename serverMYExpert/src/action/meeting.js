var express = require('express')
var router = express.Router()
var meetingDomain = require('../domain/meeting')

router.post('/add-meeting',async function(req,res){
    var addMeeting=await meetingDomain.insertMeeting(req.body);
    res.send(addMeeting);
})
router.get('/find-user-meeting',async function(req,res){
    var userMeeting=await meetingDomain.getMeetingForUser(req.query);
    res.send(userMeeting);
})
router.delete('/delete-meeting/:id', async function(req,res){
    var meetingDeleted= await meetingDomain.deleteMeeting(req.params.id);
    res.send(meetingDeleted);
})
router.put('/put-meeting',async function(req,res){
    var meetingUpdated = await meetingDomain.updateMeeting(req.body);
    res.send(meetingUpdated);
})
module.exports = router