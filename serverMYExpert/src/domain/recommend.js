var db = require('../mySqlDb')

var addRecommend = async (recommend) =>
{
    try {
        console.log("i am in domain");
        return db.
        executeStatement(`INSERT INTO commends(profId, userId, title, content, stars)
        VALUES (${recommend.profId}, ${recommend.userId}, '${recommend.title}', '${recommend.content}', ${recommend.stars} )`);
    }
    catch (e){

    }
}

var getRecommends = async () =>
{
    try{
        return db.
        executeStatement(`SELECT * FROM commends`);
    }
    catch (e){
    
    }
}
module.exports = { addRecommend , getRecommends }