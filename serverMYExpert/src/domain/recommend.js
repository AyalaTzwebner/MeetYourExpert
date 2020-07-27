var db = require('../mySqlDb')

var addRecommend = async (recommend) =>
{
    try {
        console.log("i am in domain");
        var res = db.
            executeStatement(`INSERT INTO commends(profId, userId, title, content, stars)
        VALUES (${recommend.profId}, ${recommend.userId}, '${recommend.title}', '${recommend.content}', ${recommend.stars} )`).then( () => {
            db.
                executeStatement(`SELECT avg(stars) as 'average'
            FROM commends
            WHERE profId = ${recommend.profId}
            GROUP BY profId;`).then( (result) => {
                var rating = result[0].average;
              db.
                  executeStatement(`UPDATE professional SET scores = ${rating} WHERE id = ${recommend.profId}`);
            })
        })
            
       
        return res;
    }
    catch (e){

    }
}

var getRecommends = async () =>
{
    try{
        return db.
        executeStatement(`SELECT commends.id, profId, userId, title, content, stars, isApproved, u.userName as 'user_name',  p . userName as 'expert_name'
        FROM commends INNER JOIN users u ON userId =u.id 
        INNER JOIN users  p ON profId =  p .id`);
    }
    catch (e){
    
    }
}

var changeStatus = async (id, status) =>
{
    try{
        if (!status)
        var statement = `UPDATE commends SET isApproved = true WHERE id = ${id}`;
        else
        var statement = `UPDATE commends SET isApproved = false WHERE id = ${id}`;
        return db.
        executeStatement(statement);
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
            executeStatement(`SELECT commends.id, profId, userId, title, content, stars, isApproved, u.userName as 'user_name',  p . userName as 'expert_name', name as 'user_city'
            FROM commends INNER JOIN users u ON userId = u.id 
            INNER JOIN users  p ON profId =  p .id
            INNER JOIN cities c ON c.id = u.city
            WHERE profId = ${id} and isApproved = true`);
    }
    catch(err){

    }
}

module.exports = { addRecommend , getRecommends, changeStatus, getApprovedRecommends}