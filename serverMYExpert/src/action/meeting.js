var express = require('express')
var router = express.Router()
var meetingDomain = require('../domain/meeting')

const cron = require("node-cron");
const fs = require("fs");

cron.schedule("4 22 * * *",async function () {
    console.log("running a task every day");
    let meetings =await meetingDomain.getOverduoMeetings();
    for (let i = 0; i < meetings.length; i++) {
        console.log(meetings[i])
        await meetingDomain.inviteRecommend(meetings[i]);
    }
});


router.post('/add-meeting', async function (req, res) {
    console.log(req.body)
    var addMeeting = await meetingDomain.insertMeeting(req.body);
    console.log(addMeeting);
    res.send(addMeeting);
})
router.get('/find-user-meeting', async function (req, res) {
    var userMeeting = await meetingDomain.getMeetingForUser(req.query);
    res.send(userMeeting);
})
router.delete('/delete-meeting/:id', async function (req, res) {
    var meetingDeleted = await meetingDomain.deleteMeeting(req.params.id);
    res.send(meetingDeleted);
})
router.put('/put-meeting', async function (req, res) {
    var meetingUpdated = await meetingDomain.updateMeeting(req.body);
    console.log(meetingUpdated);
    res.send(meetingUpdated);
})
router.get('/get-meetings/:id', async function (req, res) {
    console.log("&&&&&&&&&&&&");
    var allMeetingsForExpert = await meetingDomain.allMeetingsForExpert(req.params.id);
    console.log(allMeetingsForExpert);
    res.send(allMeetingsForExpert);
})

router.put('/approve-meeting', async function (req, res) {
    var approvedMeeting = await meetingDomain.approveMeeting(req.body);
    res.send(approvedMeeting);
})

router.put('/cancel-meeting', async function (req, res) {
    var canceledMeeting = await meetingDomain.cancelMeeting(req.body);
    res.send(canceledMeeting)
})

module.exports = router