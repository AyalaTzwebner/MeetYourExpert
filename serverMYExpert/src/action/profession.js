var express = require('express')
var router = express.Router()
var prof = require('../public/profession.json')

//sending a JSON file with data of all professions 
 router.get('/subjects.json', async function (req, res) {
    console.log("connection occured") 
    res.json(prof)
    console.log(prof) 
   })
  
   module.exports = router