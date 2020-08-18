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
<<<<<<< Updated upstream
        console.log(meeting);
        return await db.executeStatement(`INSERT INTO meetings (idProf, idUser, title, content, date, time,isApproved) 
VALUES('${meeting.idProf}','${meeting.idUser}','${meeting.title}','${meeting.content}','${meeting.date}','${meeting.time}',false)`);
=======
        var res = await db.executeStatement(`INSERT INTO meetings (idProf, idUser, title, content, date, time,isApproved) 
VALUES('${meeting.profId}','${meeting.userId}','${meeting.title}','${meeting.content}','${meeting.date}','${meeting.time}',false)`);
        var meetingInfo={expert:'',user:'',meeting:meeting}
        meetingInfo.expert=await db.executeStatement(`SELECT * FROM users WHERE id = '${meeting.profId}'`);
        meetingInfo.user=await db.executeStatement(`SELECT * FROM users WHERE id = '${meeting.userId}'`)
        console.log(meetingInfo.expert[0].email)

        send({
            // text:    'gmail-send example 1', 
            to: meetingInfo.expert[0].email, 
            html: `<div style="background-color: bisque; margin: auto; padding: 25px; width: 90%; height: 100%;"><div dir="rtl" 
            style="background-color: white; margin: auto; width: 100%; height: 100%;"><p style="text-align: center;">שלום ${meetingInfo.expert[0].userName}</p>
            <p style="text-align: center;">${meetingInfo.user[0].userName} רוצה לקבוע אתך פגישת ייעוץ</p><p style="text-align: center;">בשעה ${meetingInfo.meeting.time} ביום ${meetingInfo.meeting.date}</p>
            <p style="text-align: center;">נושא: ${meetingInfo.meeting.title}&nbsp;<a title="all message" href="http://localhost:4200/expertInfo/${meetingInfo.profId}/meetings">לחץ כאן לראות עוד</a></p><div 
            id="actions" ><p style="text-align: center; background-color: bisque; border: 2px inset; width: 130px; height: 30px; 
            margin: 10px; display: inline-block;"><a style="color: black;" title="approve" href="http://localhost:4200/expertInfo/${meetingInfo.profId}/meetings">אשר פגישה</a></p><p 
            style="text-align: center; background-color: bisque; border: 2px inset; width: 130px; height: 30px; margin:10px; 
            display: inline-block;"><a style="color: black;" title="options" href="http://localhost:4200/expertInfo/${meetingInfo.profId}/meetings">אפשרויות נוספות</a></p></div></div></div>`,
          }, (error, result, fullResult) => {
            if (error) console.error(error);
            console.log(result);
          })
>>>>>>> Stashed changes
    } catch (e) { }
}
var getMeetingForUser = async (params) => {
    try {
        console.log(params);
        var res = await db.executeStatement(`SELECT * FROM meetings WHERE idProf = ${params.expert} and idUser = ${params.user}`);
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
<<<<<<< Updated upstream
        console.log(meet);
        return await db.executeStatement(`UPDATE meetings SET title = '${meet.title}', content = '${meet.content}' 
        , date = '${meet.date}' , time = '${meet.time}'   WHERE id = ${meet.id}`)
    }catch(e){}
=======
        return await db.executeStatement(`UPDATE meetings SET title = ${meet.title}, content = ${meet.content} 
        , date = ${meet.date} , time = ${meet.time}   WHERE id = ${meet.id}`)
    } catch (e) { }
>>>>>>> Stashed changes
}
var allMeetingsForExpert = async (id) => {
    try {
        var res = await db.executeStatement(`SELECT * FROM meetings WHERE idProf = ${id}`);
        return res;
    } catch (e) { }
}
<<<<<<< Updated upstream
var approveMeeting = async (meet) =>{
    try{
        return await db
        .executeStatement(`UPDATE meetings SET isApproved = 1 WHERE id = ${meet.id}`);
    }
    catch(e){console.log(e)}
}

var cancelMeeting = async (meet) =>{
    try{
        console.log("1234567890")
        return await db
        .executeStatement(`UPDATE meetings SET isApproved = 0 WHERE id = ${meet.id}`)
    }
    catch (e){
        console.log(e);
    }
}

module.exports = { insertMeeting, getMeetingForUser, deleteMeeting, updateMeeting ,allMeetingsForExpert,approveMeeting, cancelMeeting}
=======
module.exports = { insertMeeting, getMeetingForUser, deleteMeeting, updateMeeting, allMeetingsForExpert }
>>>>>>> Stashed changes
