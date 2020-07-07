var db = require('../mySqlDb')

var getAllFields = async () => {
    try {
        return db
            .executeStatement(`SELECT * FROM fields`)
    }
    catch (e) {

    }
}

module.exports = { getAllFields }