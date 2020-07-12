var db = require('../mySqlDb')

var getAllFields = async () => {
    try {
        return db
            .executeStatement(`SELECT * FROM fields`)
    }
    catch (e) {

    }
}

var getParents = async () => {
    try{
        return db.executeStatement(`SELECT *
        FROM fields
        where parent is null`)
    }
    catch (e)
    {

    }
}

var getChildren = async (id) =>{
    try{
        return db.executeStatement(`SELECT * 
        FROM fields
        where parent = ${id}`)
    }
    catch (e)
    {

    }
}

var getSubjectByName = async (name) =>{
    try{
        return db.executeStatement(
            `SELECT *
            FROM fields
            WHERE '${name}' = subName;`
        )
    }
    catch{

    }
}

module.exports = { getAllFields , getParents, getChildren, getSubjectByName}