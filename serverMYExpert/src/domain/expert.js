
var db = require('../mySqlDb')

var insertExpert = (expert) => {
  return db
    .executeStatement(`INSERT INTO users (userName,userPassword,email,city) 
      VALUES('${expert.userName}','${expert.userPassword}','${expert.email}','${expert.city}')`)
    .then((insInfo) => {
      return db.executeStatement(`INSERT INTO professional (id,proSubject,scores) 
      VALUES('${insInfo.insertId}','${expert.proSubject}','0')`)
    }).catch(err => {
      return err
    });
}
var getExperts = async () => {
  try {
    return await db.executeStatement(`SELECT * FROM proffesional p INNER JOIN user u ON p.id = u.id`)
  } catch (e) {

  }
  console.log()
}
module.exports = { insertExpert, getExperts }


