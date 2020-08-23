var db = require('../mySqlDb')

var addRecommend = async (recommend) =>
{
    try {
        console.log("i am in domain");
        var res = db.
            executeStatement(`INSERT INTO commends(profId, userId, title, content, stars, date_posted)
        VALUES (${recommend.profId}, ${recommend.userId}, '${recommend.title}', '${recommend.content}', ${recommend.stars},  NOW())`);
                 
       
        return res;
    }
    catch (e){

    }
}

var getRecommends = async () =>
{
    try{
        return db.
        executeStatement(`SELECT commends.id, profId, userId, title, content, stars, isApproved, u.userName as 'user_name',  p . userName as 'expert_name', date_posted
        FROM commends INNER JOIN users u ON userId =u.id 
        INNER JOIN users  p ON profId =  p .id`);
    }
    catch (e){
    
    }
}

var changeStatus = async (recommend) =>
{
    console.log("the recommend: ",recommend);
    try{
        if (!recommend.isApproved)
        var statement = `UPDATE commends SET isApproved = true WHERE id = ${recommend.id}`;
        else
        var statement = `UPDATE commends SET isApproved = false WHERE id = ${recommend.id}`;
        return db.
        executeStatement(statement).then( () =>{

            db.
                executeStatement(`SELECT avg(stars) as 'average'
            FROM commends
            WHERE profId = ${recommend.profId} and isApproved = true
            GROUP BY profId;`).then( (result) => {
                if (!result.length>0)
                    var rating = 0;
                else
                    var rating = result[0].average;           
              db.
                  executeStatement(`UPDATE professional SET scores = ${rating} WHERE id = ${recommend.profId}`);
                
            })
        
        } );
    }
    catch(err)
    {
        console.log(err);
    }
}

var getApprovedRecommends = async (id) =>
{
    try{
            return db.
            executeStatement(`SELECT commends.id, profId, userId, title, content, stars, isApproved, u.userName as 'user_name',  p . userName as 'expert_name', name as 'user_city', date_posted
            FROM commends INNER JOIN users u ON userId = u.id 
            INNER JOIN users  p ON profId =  p .id
            INNER JOIN cities c ON c.id = u.city
            WHERE profId = ${id} and isApproved = true`);
    }
    catch(err){

    }
}

var getRecommendsOfPage = async (params) =>
{
    var numRows;
    var numPerPage = parseInt(params.npp, 10) || 1;
    var page = parseInt(params.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    var limit = skip + ',' + numPerPage;
    try{
        var res = await db.executeStatement(`SELECT count(*) as numRows FROM commends`)
        numRows = res[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
        console.log('number of pages: ', numPages);
        res = await db.executeStatement(`SELECT commends.id, profId, userId, title, content, stars, isApproved, u.userName as 'user_name',  p . userName as 'expert_name', date_posted
        FROM commends INNER JOIN users u ON userId =u.id 
        INNER JOIN users  p ON profId =  p .id ORDER BY date_posted DESC LIMIT ${limit}`);
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
    }
    catch (err){
        console.log(err);
    }
}

module.exports = { addRecommend , getRecommends, changeStatus, getApprovedRecommends, getRecommendsOfPage}