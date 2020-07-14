var express = require('express')
var router = express.Router()
var cityDomain = require('../domain/city')

router.get('/all', async function (req, res) {
   var allCities = await cityDomain.getAllCities();
   console.log(allCities.length)
   res.send(allCities);
})
module.exports = router

