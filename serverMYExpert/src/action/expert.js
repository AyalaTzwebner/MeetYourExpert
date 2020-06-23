var express = require('express')
var router = express.Router()
var expertDomain = require('../domain/expert')

router.post('/signup',async function(req,res){
  var expSignup= await expertDomain.insertExpert(req.body)
  res.send(expSignup)
})
router.post('./all',async function(req,res){
  var getExperts=await expertDomain.getExperts();
  res.send(getExperts);
})
module.exports = router