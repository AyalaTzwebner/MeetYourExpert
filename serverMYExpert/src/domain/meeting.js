var db = require('../mySqlDb')

var insertMeeting = async (meeting) => {
    try {
        console.log(meeting);
        return await db.executeStatement(`INSERT INTO meetings (idProf, idUser, title, content, date, time,isApproved) 
VALUES('${meeting.idProf}','${meeting.idUser}','${meeting.title}','${meeting.content}','${meeting.date}','${meeting.time}',false)`);
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
        console.log(meet);
        return await db.executeStatement(`UPDATE meetings SET title = '${meet.title}', content = '${meet.content}' 
        , date = '${meet.date}' , time = '${meet.time}'   WHERE id = ${meet.id}`)
    }catch(e){}
}
var allMeetingsForExpert= async (id) =>{
    try{
        var res=await db.executeStatement(`SELECT * FROM meetings WHERE idProf = ${id}`);
        return res;
    }catch(e){}
}
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