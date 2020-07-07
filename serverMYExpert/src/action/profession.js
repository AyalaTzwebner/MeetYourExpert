var express = require('express')
var router = express.Router()
var profDomain = require('../domain/profession')

 router.get('/all', async function (req, res) {
    var allFields=await profDomain.getAllFields();
    res.send(allFields);
   })
  
   module.exports = router