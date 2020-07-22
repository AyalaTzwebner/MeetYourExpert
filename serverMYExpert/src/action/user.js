var express = require('express')
var router = express.Router()
var userDomain = require('../domain/user')
var recommendDomain = require('../domain/recommend')

router.post('/login', async function (req, res) {
  var userLogin = await userDomain.getUserByLogin(req.body)
  res.send(userLogin)
})
router.post('/signup',async function(req,res){
  console.log("post here!")
  var userSignup= await userDomain.insertUser(req.body)
  res.send(userSignup)
})

router.post('/loginManager', async function (req, res) 
{
  console.log('welcome, manger!')
}
)



module.exports = router