
var db = require('../mySqlDb')

//check if username and password are valid, for a login process. 
var getUserByLogin = (user) => {
  obj = {}
  return db
    .executeStatement(`select * from users 
    where email ='${user.email}' and userPassword='${user.password}'`)
    .then((userInfo) => {
      if (userInfo.length > 0) {
        return userInfo[0]
      }
      else {
 return null
      }
    }
    ).catch(err => {
      console.log(err);
      return err;
    })
}

var managerLogin = (manager) => {
  try {
    return db
      .executeStatement(`select * from users
      where userType = 3 and userName = '${manager.name}' and userPassword='${manager.password}'`)
  }
  catch(e){
    console.log(e);
  }
}

var insertUser = (user) => {
  console.log("Im here!");
  return db
    .executeStatement(`INSERT INTO users (userName,userPassword,email,city,isManager,userType) 
      VALUES('${user.userName}','${user.userPassword}','${user.email}',${user.city},0,1)`)
    .then((userInfo) => {
      console.log("true");
      return true
    }
    ).catch(err => {
      console.log(err)
      return err
    })
}

var getUserById = async (id) => {

  try {
    return await db.executeStatement(`SELECT * FROM users WHERE id = '${id}'`)
  } catch (e) {
  }
}




module.exports = { getUserByLogin, insertUser, getUserById, managerLogin }

