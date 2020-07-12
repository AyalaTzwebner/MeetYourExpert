
var db = require('../mySqlDb')

var insertExpert = (expert) => {
  return db
    .executeStatement(`INSERT INTO users (userName,userPassword,email,city) 
      VALUES('${expert.userName}','${expert.userPassword}','${expert.email}',${expert.city})`)
    .then((insInfo) => {
      return db.executeStatement(`INSERT INTO professional (id,proSubject, businessName, description, scores) 
      VALUES('${insInfo.insertId}',${expert.proSubject}, '${expert.businessName}','${expert.description}' ,0)`)
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

var getFilteredExperts = async (category, subject, city, name) => {
  try {
    var sqlQuery = "SELECT * FROM professional p inner join users u ON p.id = u.id ";
    var whereQuery = "WHERE";
    var hasCondition = false;
    if (category && category != "") {
      hasCondition = true;
      whereQuery += ` p.proSubject in (SELECT proSubject FROM meet_your_expert.fields WHERE parent=${category}) or p.proSubject=${category} and `;

    }
    if (subject && subject != "") {
      hasCondition = true;
      whereQuery += ` p.proSubject = ${subject} and `;

    }
    if (city && city != "") {
      hasCondition = true;
      whereQuery += ` u.city = ${city} and `
    }
    if (name && name != "") {
      hasCondition = true;
      whereQuery += ` u.userName like '%${name}%' and `
    }
    if (hasCondition) {
      sqlQuery += whereQuery;
      sqlQuery = sqlQuery.substr(0, sqlQuery.length - 4);
      sqlQuery += ";";
    }
    console.log(sqlQuery);
    return db.executeStatement(sqlQuery);
  }
  catch (e) {

    }
  }

module.exports = { insertExpert, getExperts, getExpertById, getFilteredExperts}


