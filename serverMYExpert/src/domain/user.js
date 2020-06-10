
var db = require('../mySqlDb')

var getUserByLogin = (user) => {
  return db
    .executeStatement(`select * from users 
    where userName ='${user.userName}' and userPassword='${user.userPassword}'` )
    .then((userInfo) => {

  console.log(userInfo)
    return userInfo.length?"user exists":"not exists"
        }
      )
    }

module.exports = {getUserByLogin}
