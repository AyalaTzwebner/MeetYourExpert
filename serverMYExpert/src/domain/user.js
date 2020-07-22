
var db = require('../mySqlDb')

//check if username and password are valid, for a login process. 
var getUserByLogin = (user) => {
  obj = {}
  return db
    .executeStatement(`select * from users 
    where email ='${user.email}' and userPassword='${user.password}'`)
    .then((userInfo) => {
      if (userInfo.length > 0) {
        obj.found = true;
        obj.user=userInfo[0];
        return db.executeStatement(`SELECT * FROM professional WHERE id = ${userInfo[0].id}`).then((info => {
          if (info.length > 0)
            obj.expert = true;
          else
            obj.expert = false;
          return obj
        }))
      }
      else {
        obj.found = false;
        return obj;
      }
    }
    ).catch(err => {
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

