
var db = require('../sqlDB')

var getUserByLogin = (user) => {
  return db
    .executeStatementy(`select * from allUsers 
    where userName ='${user.userName}' and userPassword='${user.userPassword}'` )
    .then((studyInfo) => 
       studyInfo
      )
    }

module.exports = {getUserByLogin}
