
var db = require('../mySqlDb')

var insertExpert = (expert) => {
  return db
    .executeStatement(`INSERT INTO users (userName,userPassword,email,city) 
      VALUES('${expert.userName}','${expert.userPassword}','${expert.email}',${expert.city})`)
    .then((insInfo) => {
      return db.executeStatement(`INSERT INTO professional (id,proSubject,scores) 
      VALUES('${insInfo.insertId}',${expert.proSubject},0)`)
    }).catch(err => {
      return err
    });
}
// var getExperts = () => {
//   console.log("1");
//   return db
//   .executeStatement(`SELECT * FROM professional p INNER JOIN users u ON p.id = u.id`)
//   .then((getInfo)=>{
//   }).catch(err=>{
//     return err;
//   })
//   }
var getExperts = async () => {
  console.log("server 3")
  try {
    return await db.executeStatement(`SELECT * FROM professional p INNER JOIN users u ON p.id = u.id`)
  } catch (e) {
  }
  console.log()
}

var getExpertById = async (id) => {

  try {
    return await db.executeStatement(`SELECT * FROM professional p INNER JOIN users u ON p.id = u.id WHERE p.id = '${id}'`)
  } catch (e) {
  }
}

module.exports = { insertExpert, getExperts, getExpertById }


