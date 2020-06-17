var express = require('express')
var router = express.Router()
var city = require('../public/city.json')

//sending a JSON file which contains data of all cities in Israel 
 router.get('/city.json', async function (req, res) {
    console.log("connection occured") 
    res.json(city)
    console.log(city) 
   })
  
   module.exports = router

