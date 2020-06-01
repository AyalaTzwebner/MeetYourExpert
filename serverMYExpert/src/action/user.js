var express = require('express')
var router = express.Router()
var userDomain = require('../domain/user')

router.post('/login', async function (req, res) {
  var userLogin = await userDomain.login()
  res.send(userLogin)
})

module.exports = router