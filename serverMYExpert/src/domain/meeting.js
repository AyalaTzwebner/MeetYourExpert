var db = require('../mySqlDb')

var insertMeeting = async (meeting) =>{
    try{
return await db.executeStatement(`INSERT INTO meetings (idProf, idUser, title, content, date, time,isApproved) 
VALUES('${meeting.profId}','${meeting.userId}','${meeting.title}','${meeting.content}','${meeting.date}','${meeting.time}',false)`);
    }catch(e){}
}

module.exports = {insertMeeting}