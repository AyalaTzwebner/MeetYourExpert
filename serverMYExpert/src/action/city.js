var express = require('express')
var router = express.Router()
var cityDomain = require('../domain/city')

router.get('/all', async function (req, res) {
   var allCities = await cityDomain.getAllCities();
   res.send(allCities);
})

module.exports = router

