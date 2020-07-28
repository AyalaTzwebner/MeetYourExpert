var db = require('../mySqlDb')

var insertMeeting = async (meeting) => {
    try {
        return await db.executeStatement(`INSERT INTO meetings (idProf, idUser, title, content, date, time,isApproved) 
VALUES('${meeting.profId}','${meeting.userId}','${meeting.title}','${meeting.content}','${meeting.date}','${meeting.time}',false)`);
    } catch (e) { }
}
var getMeetingForUser = async (params) => {
    try {
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
        return await db.executeStatement(`UPDATE meetings SET title = ${meet.title}, content = ${meet.content} 
        , date = ${meet.date} , time = ${meet.time} ,  WHERE id = ${meet.id}`)
    }catch(e){}
}
module.exports = { insertMeeting, getMeetingForUser, deleteMeeting, updateMeeting }