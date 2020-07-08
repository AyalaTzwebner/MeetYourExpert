var express = require('express')
var router = express.Router()
var cityDomain = require('../domain/city')

<<<<<<< Updated upstream
router.get('/all', async function (req, res) {
   var allCities = await cityDomain.getAllCities();
   res.send(allCities);
})

module.exports = router
=======
//sending a JSON file which contains data of all cities in Israel 
 router.get('/city.json', async function (req, res) {
    console.log("connection occured") 
    res.json(city)
   })
  
   module.exports = router
>>>>>>> Stashed changes

