var express = require('express')
var router = express.Router()
var expertDomain = require('../domain/expert')

router.post('/signup',async function(req,res){
  var expSignup= await expertDomain.insertExpert(req.body)
  res.send(expSignup)
})
router.get('/all',async function(req,res){
  var getExperts=await expertDomain.getExperts();
  res.send(getExperts);
})
router.get('/:id',async function(req,res){

  console.log("server 2");
  var getExpert=await expertDomain.getExpertById(req.params.id);
  res.send(getExpert);
})
module.exports = router