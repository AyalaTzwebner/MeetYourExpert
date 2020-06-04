
var db = require('../sqlDB')

var getUserByLogin = (user) => {
  return db
    .executeStatement(`select * from allUsers 
    where userName ='${user.userName}' and userPassword='${user.userPassword}'` )
    .then((userInfo) => 
       userInfo
      )
    }

module.exports = {getUserByLogin}
