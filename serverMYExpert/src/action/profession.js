var express = require('express')
var router = express.Router()
var profDomain = require('../domain/profession')

<<<<<<< Updated upstream
 router.get('/all', async function (req, res) {
    var allFields=await profDomain.getAllFields();
    res.send(allFields);
=======
//sending a JSON file with data of all professions 
 router.get('/subjects.json', async function (req, res) {
    console.log("connection occured") 
    res.json(prof)
>>>>>>> Stashed changes
   })
  
   module.exports = router