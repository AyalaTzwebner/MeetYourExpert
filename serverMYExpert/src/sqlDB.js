var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;

const config = {
    authentication: {
        // options: {
        //   userName: ,
        //   password: 
        // },
        type: "default"
    },
    server: "DESKTOP-1HT6NS2",
    options: {
        database: "MeetYourExpert",
        encrypt: true,
        useColumnNames: true
    }
};
var connection;

var openConnection = () => {
    return new Promise(resolve => {
        connection = new Connection(config);
        connection.on("connect", function (err) {
            if (err) {
                console.log(err);
            }
            resolve();
        });
    });
};

var closeConnection = () => {
    connection.close();
};

var executeStatement = async (query) => {
    return new Promise(resolve => {
        request = new Request(query, function (err, rowsAffected) {
            if (err) {
                resolve(null);
            } else {
                // arrived here when no result return but no eror
                resolve(rowsAffected);
            }
        });

        const _rows = [];
        request.on("row", columns => {
            var _item = {};
            for (var name in columns) {
                _item[name] = columns[name].value;
            }
            _rows.push(_item);
            resolve(_rows);
        });
        connection.execSql(request);
    });
};

module.exports = {
    openConnection,
    executeStatement
};