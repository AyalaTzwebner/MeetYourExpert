var express = require('express')
var router = express.Router()
var profDomain = require('../domain/profession');
const { all } = require('./city');

 router.get('/all', async function (req, res) {
    var allFields=await profDomain.getAllFields();
    res.send(allFields);
   })
  
   router.get('/parents', async function (req, res)
   {
      console.log("parents sent");
      var allParents = await profDomain.getParents();
      res.send(allParents);
   }
   )

   router.get('/children', async function (req, res)
   {
      var allChildren = await profDomain.getChildren(req.query.id);
      res.send(allChildren);
   }
   )
   
   router.get('/getSubjectByName', async function (req, res)
   {
   var subject = await profDomain.getSubjectByName();
   res.send(subject);
   }
   )

   module.exports = router