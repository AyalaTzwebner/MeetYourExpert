const mysql=require("mysql2")
const pool = mysql.createPool({
    user: 'root',
    database: 'meet_your_expert',
    password:'1234'
})
let connection = pool.promise()

const executeStatement = async (query, listParams = []) => {
  console.log(query);  
  const [results] = await connection.query(query, listParams)
  return results
}

module.exports = {executeStatement}