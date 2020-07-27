var db = require('../mySqlDb')

var insertExpert = (expert) => {
  return db
    .executeStatement(`INSERT INTO users (userName,userPassword,email,city,isManager,userType) 
      VALUES('${expert.userName}','${expert.userPassword}','${expert.email}',${expert.city},0,2)`)
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
  try {
    return await db.executeStatement(`SELECT * FROM professional p INNER JOIN users u ON p.id = u.id WHERE enable=true`)
  } catch (e) {
  }
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
    var whereQuery = "WHERE enable=true and";
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
    return db.executeStatement(sqlQuery);
  }
  catch (e) {

  }
}
var changeStatus = async (object) => {
  try {
    return await db.executeStatement(`UPDATE professional SET enable = ${object.status} WHERE id = ${object.id}`)
  } catch (e) { }
}
var getExpertsByPage = async (params) => {
  var numRows;
  var numPerPage = parseInt(params.npp, 10) || 1;
  var page = parseInt(params.page, 10) || 0;
  var numPages;
  var skip = page * numPerPage;
  var limit = skip + ',' + numPerPage;
  try {
    var res = await db.executeStatement(`SELECT count(*) as numRows FROM professional p inner join users u ON p.id = u.id`)
    numRows = res[0].numRows;
    numPages = Math.ceil(numRows / numPerPage);
    console.log('number of pages: ', numPages);
    res = await db.executeStatement(`SELECT * from professional p inner join users u ON p.id = u.id ORDER BY p.id LIMIT ${limit}`);
    var responsePayload = { results: res };
    if (page < numPages) {
      responsePayload.pagination = {
        current: page,
        perPage: numPerPage,
        length: numRows,
        previous: page > 0 ? page - 1 : undefined,
        next: page < numPages - 1 ? page + 1 : undefined
      }
    }
    else responsePayload.pagination = {
      err: 'queried page ' + page + ' is >= to maximum page number ' + numPages
    }
    return responsePayload;
  } catch (e) { }

}
var isExpert = async (params) => {
  console.log("param: ", params.id)
  try {
    var res = await db.executeStatement(`SELECT * FROM professional WHERE id = ${params.id}`)
    if (res != null && res.length > 0)
      return true;
    else return falsezs
  } catch (e) { }
}
var putExpert = async (expert) =>{
  try{
    var updateUser= db.executeStatement(`UPDATE users SET userName = '${expert.userName}' , userPassword = '${expert.userPassword}' , city = ${expert.city} , img = '${expert.imgUrl}' WHERE id = ${expert.id}`);
    var updateExpert= db.executeStatement(`UPDATE professional SET businessName = '${expert.businessName}' , description = '${expert.description}' WHERE id = ${expert.id}`);
    return {updateUser:updateUser,updateExpert:updateExpert};
  }catch(e){}
}
module.exports = { insertExpert, getExperts, getExpertById, getFilteredExperts, changeStatus, getExpertsByPage, isExpert ,putExpert}


