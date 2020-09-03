var db = require('../mySqlDb');
const send = require('gmail-send')({
    user: 'meetyourexpert2020@gmail.com',
    pass: 'thkvusxh20',
    from: 'פגוש את המומחה',
    subject: 'קביעת ייעוץ',
});

var insertMeeting = async (meeting) => {
    console.log("AAAAAA")
    try {
        var res = await db.executeStatement(`INSERT INTO meetings (idProf, idUser, title, content, date, time,isApproved) 
VALUES('${meeting.idProf}','${meeting.idUser}','${meeting.title}','${meeting.content}','${meeting.date}','${meeting.time}',false)`);
        var meetingInfo = { expert: '', user: '', meeting: meeting }
        meetingInfo.expert = await db.executeStatement(`SELECT * FROM users WHERE id = '${meeting.idProf}'`);
        meetingInfo.user = await db.executeStatement(`SELECT * FROM users WHERE id = '${meeting.idUser}'`)
        console.log(meetingInfo.expert[0].email)

        send({
            to: meetingInfo.expert[0].email,
            html: `<div style="background-color: bisque; margin: auto; padding: 25px; width: 90%; height: 100%;"><div dir="rtl" 
            style="background-color: white; margin: auto; width: 100%; height: 100%;"><p style="text-align: center;">שלום ${meetingInfo.expert[0].userName}</p>
            <p style="text-align: center;">${meetingInfo.user[0].userName} רוצה לקבוע אתך פגישת ייעוץ</p><p style="text-align: center;">בשעה ${meetingInfo.meeting.time} ביום ${meetingInfo.meeting.date}</p>
            <p style="text-align: center;">נושא: ${meetingInfo.meeting.title}&nbsp;</p><p style="text-align: center;"><a title="all message" href="http://localhost:4200/expertInfo/${meetingInfo.expert[0].id}/meetings">לחץ כאן לראות עוד</a></p><div 
            id="actions" ><p style="text-align: center; background-color: bisque; border: 2px inset; width: 130px; height: 30px; 
            margin: 10px; display: inline-block;"><a style="color: black;" title="approve" href="http://localhost:4200/expertInfo/${meetingInfo.idProf}/meetings">אשר פגישה</a></p><p 
            style="text-align: center; background-color: bisque; border: 2px inset; width: 130px; height: 30px; margin:10px; 
            display: inline-block;"><a style="color: black;" title="options" href="http://localhost:4200/expertInfo/${meetingInfo.expert[0].id}/meetings">אפשרויות נוספות</a></p></div></div></div>`,
        }, (error, result, fullResult) => {
            if (error) console.error(error);
            console.log(result);
        })
    } catch (e) { }
}
var getMeetingForUser = async (params) => {
    try {
        console.log(params);
        var res = await db.executeStatement(`SELECT * FROM meetings m WHERE idProf = ${params.expert} and idUser = ${params.user} and datediff(m.date,now())>0`);
        if (res && res.length > 0)
            return res[0];
        else return null;
    } catch (e) { }
}
var deleteMeeting = async (id) => {
    try {
        var res = await db.executeStatement(`DELETE FROM meetings WHERE id = ${id}`);
        return res;
    } catch (e) { }
}
var updateMeeting = async (meet) => {
    try {
        console.log(meet);
        return await db.executeStatement(`UPDATE meetings SET title = '${meet.title}', content = '${meet.content}' 
        , date = '${meet.date}' , time = '${meet.time}'   WHERE id = ${meet.id}`)
    } catch (e) { }
}
var allMeetingsForExpert = async (id) => {
    try {
        var res = await db.executeStatement(`SELECT * FROM meetings WHERE idProf = ${id}`);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        return res;
    } catch (e) { }
}
var approveMeeting = async (meet) => {
    try {
        return await db
            .executeStatement(`UPDATE meetings SET isApproved = 1 WHERE id = ${meet.id}`);
    }
    catch (e) { console.log(e) }
}

var cancelMeeting = async (meet) => {
    try {
        console.log("1234567890")
        return await db
            .executeStatement(`UPDATE meetings SET isApproved = 0 WHERE id = ${meet.id}`)
    }
    catch (e) {
        console.log(e);
    }
}
var getOverduoMeetings =async (date) => {
    try {
        var meetings = await db.executeStatement(`SELECT * FROM meetings WHERE isApproved = 1 and date <= DATE(NOW())`);
        return meetings
    }
    catch (e) { }
}
var inviteRecommend =async (meeting) => {
    try {
        var meetingInfo = { expert: '', user: '', meeting: meeting }
        meetingInfo.expert = await db.executeStatement(`SELECT * FROM users WHERE id = '${meeting.idProf}'`);
        meetingInfo.user = await db.executeStatement(`SELECT * FROM users WHERE id = '${meeting.idUser}'`)
        send({
            to: meetingInfo.user[0].email,
            html: `<div style="background-color: bisque; margin: auto; padding: 25px; width: 90%; height: 100%;">
            <div dir="rtl" style="background-color: white; margin: auto; width: 100%; height: 100%;">
            <p style="text-align: center;">שלום ${meetingInfo.user[0].userName}</p><p style="text-align: center;">נשמח אם תיכנס&nbsp;
            <a title="recommend" href="http://localhost:4200/expert/${meetingInfo.expert[0].id}/add-recommend">לכאן</a>&nbsp;להמליץ על 
            ${meetingInfo.expert[0].userName}</p><p style="text-align: center; background-color: bisque; border: 2px inset; width: 130px; 
            height: 30px; margin: 10px; display: inline-block;"><a style="color: black;" title="approve" href="http://localhost:4200
            /expert/${meetingInfo.expert[0].id}/add-recommend">להכנס לטופס ההמלצה</a></p></div></div></div>`,
        }, (error, result, fullResult) => {
            if (error) console.error(error);
            console.log(result);
        })
    }
    catch (e) { }
}
module.exports = { insertMeeting, getMeetingForUser, deleteMeeting, updateMeeting, allMeetingsForExpert, approveMeeting, cancelMeeting, getOverduoMeetings, inviteRecommend }