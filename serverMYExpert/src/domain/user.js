
var db = require('../mySqlDb')

//check if username and password are valid, for a login process. 
var getUserByLogin = (user) => {
  return db
    .executeStatement(`select * from users 
    where userName ='${user.userName}' and userPassword='${user.userPassword}'`)
    .then((userInfo) => { console.log("login:" + userInfo)
      return userInfo.length ? "user exists" : "not exists"
    }
    )
}
var insertUser = (user) => {
  console.log("Im here!");
  return db
    .executeStatement(`INSERT INTO users (userName,userPassword,email,city) 
      VALUES('${user.userName}','${user.userPassword}','${user.email}',${user.city})`)
    .then((userInfo) => {
      console.log("true");
     return true
    }
    ).catch(err => {
      console.log(err)
      return err
    })
}
module.exports = { getUserByLogin, insertUser }

