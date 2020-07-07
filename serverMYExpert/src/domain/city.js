var db = require('../mySqlDb')

var getAllCities = async () => {
    try {
        return db
            .executeStatement(`SELECT * FROM cities`)
    }
    catch (e) {

    }
}

module.exports = { getAllCities }