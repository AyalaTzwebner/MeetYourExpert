var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var sql = require("mssql/msnodesqlv8");

const config = {
  driver: "msnodesqlv8",
  server: "localhost",
  database: "MeetYourExpert",
  userName:'1',
  username:'1',
  user:'2',
  password:'123',
  port:'1433',
  options: {
    // userName:'3',
    // user:'4',
    trustedConnection: true,
    useUTC: true
  },
//   authentication: {

//     options: {
//       userName:'DESKTOP-1HT6NS2',
// password:'',
//     },
//     type: "default"
//   },
//   server: 'localhost',
//   options: {
//     database: 'MeetYourExpert',
//     encrypt: true,
//     useColumnNames: true
//   }
};
var connection;

var openConnection = () => {
  return new Promise(resolve => {
    connection = new Connection(config);
    connection.on("connect", function(err) {
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

var executeStatement = async (query, listParams = []) => {
  return new Promise(resolve => {
    request = new Request(query, function(err, rowsAffected) {
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

    for (var param of listParams) {
      request.addParameter(param.name, TYPES[param.type], param.value);
    }

    connection.execSql(request);
  });
};

module.exports = {
    openConnection,
    executeStatement,
    closeConnection,
    
}


// ewgular password for ssms

// var sql = require("mssql");

// // config for your database
// // var config = {
// //     // user: 'sa',
// //     // password: 'mypassword',
// //     server: 'localhost',
// //     database: 'MeetYourExpert'
// // };

// // var executeStatement = (queryString) =>
// //     // connect to your database
// //     sql.connect(config, function (err) {

// //         if (err) console.log(err);

// //         // create Request object
// //         var request = new sql.Request();

// //         // query to the database and get the records
// //         request.query(queryString, function (err, recordset) {

// //             if (err) console.log(err)

// //             // send records as a response
// //             res.send(recordset);

// //         });
// //     });
// // var Connection = require("tedious").Connection;
// // var Request = require("tedious").Request;

// const config = {
//     // authentication: {
//     //     // options: {
//     //     //   userName: ,
//     //     //   password: 
//     //     // },
//     //     type: "default"
//     // },
//     server: 'localhost',
//     database: 'MeetYourExpert'
//     // server: "localhost",
//     // options: {
//     //     database: "MeetYourExpert",
//     //     encrypt: true,
//     //     useColumnNames: true
//     // }
// };
// var connection;

// var openConnection = () => {
//     return new Promise(resolve => {
//         sql.connect(config, function (err) {

//             if (err) console.log(err);

//             // create Request object
//             var request = new sql.Request();

//             // query to the database and get the records
//             request.query(queryString, function (err, recordset) {

//                 if (err) console.log(err)

//                 // send records as a response
//                 resolve(recordset);

//             });
//         })
//     });
// }
// var closeConnection = () => {
//     connection.close();
// };

// var executeStatement = async (query) => {
//     return new Promise(resolve => {
//         request = new Request(query, function (err, rowsAffected) {
//             if (err) {
//                 resolve(null);
//             } else {
//                 // arrived here when no result return but no eror
//                 resolve(rowsAffected);
//             }
//         });

//         const _rows = [];
//         request.on("row", columns => {
//             var _item = {};
//             for (var name in columns) {
//                 _item[name] = columns[name].value;
//             }
//             _rows.push(_item);
//             resolve(_rows);
//         });
//         connection.execSql(request);
//     });
// };

// module.exports = {
//     openConnection,
//     executeStatement
// };