var express = require('express');
var router = express.Router();

var globalSearchHistory = [];
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('error usage');
});

router.get('/imagesearch/?*', function(req, res, next) {
  globalSearchHistory.push(req.params[0])
  var Bing = require('node-bing-api')({ accKey: "0b8d3ff4a82c46bfb0177210fb799bec" });
  Bing.images(req.params[0], function(error, r, body){
    res.json(body.value);
  });
});

router.get('/latest/imagesearch', function(req, res, next) {
  if(globalSearchHistory.length === 0){
    res.send("history is empty");
    return;
  }
  
  var Bing = require('node-bing-api')({ accKey: "0b8d3ff4a82c46bfb0177210fb799bec" });
  Bing.images(req.params[0], function(error, r, body){
    var resData = {};
    
    resData["search_history"] = globalSearchHistory;
    resData["latest_search"] = globalSearchHistory[globalSearchHistory.length - 1];
    resData["search_result"] = body.value;

    res.send(resData);
  });
  
});
module.exports = router;
