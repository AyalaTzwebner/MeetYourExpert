var express = require('express')
var router = express.Router()
var recommendDomain = require('../domain/recommend');

router.post('/saveRecommend', async function(req, res){
    console.log("I am here")
    var response = await recommendDomain.addRecommend(req.body);
    res.send(response);
})



router.get('/getApprovedRecommends/:id', async function(req, res)
{
      console.log("I am in finding recommends!");
      var commends = await recommendDomain.getApprovedRecommends(req.params.id);
      res.send(commends);
})

router.get('/getRecommends', async function(req, res)
{
    var commends = await recommendDomain.getRecommends();
    res.send(commends);
})

router.put('/changeStatus', async function(req,res)
{
    console.log( req.body.commentId + " " + req.body.status);
    var statusChanged = await recommendDomain.changeStatus(req.body.commentId,req.body.status);
    res.send(statusChanged);
})




module.exports = router;