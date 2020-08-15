var express = require('express')
var router = express.Router()
var recommendDomain = require('../domain/recommend');

router.post('/saveRecommend', async function(req, res){
    var response = await recommendDomain.addRecommend(req.body);
    console.log(response);
    res.send(response);
})



router.get('/getApprovedRecommends/:id', async function(req, res)
{
      var commends = await recommendDomain.getApprovedRecommends(req.params.id);
      res.send(commends);
})

router.get('/getRecommends', async function(req, res)
{
    var commends = await recommendDomain.getRecommends();
    res.send(commends);
})

router.get('/all/page/:page',async function(req,res){
    var getRecommendsOfPage=await recommendDomain.getRecommendsOfPage(req.query);
    console.log("recommends:");
    console.log( getRecommendsOfPage );
    res.send(getRecommendsOfPage);
})


router.put('/changeStatus', async function(req ,res)
{
    var statusChanged = await recommendDomain.changeStatus(req.body);
    res.send(statusChanged);
})





module.exports = router;