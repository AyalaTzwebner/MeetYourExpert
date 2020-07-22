var express = require('express')
var router = express.Router()
var recommendDomain = require('../domain/recommend');

router.post('/saveRecommend', async function(req, res){
    console.log("I am here")
    var response = await recommendDomain.addRecommend(req.body);
    res.send(response);
})

router.get('/getRecommends', async function(req, res){
    var commends = await recommendDomain.getRecommends();
    res.send(commends);
})

module.exports = router;