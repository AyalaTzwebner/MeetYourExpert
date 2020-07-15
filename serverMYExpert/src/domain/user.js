
var db = require('../mySqlDb')

//check if username and password are valid, for a login process. 
var getUserByLogin = (user) => {
  return db
    .executeStatement(`select * from users 
    where userName ='${user.email}' and userPassword='${user.password}'`)
    .then((userInfo) => { console.log("login:" + userInfo)
      return userInfo.length ? userInfo[0] : null
    }
    ).catch(err=>{
      console.log(err);
      return err;
    })
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

