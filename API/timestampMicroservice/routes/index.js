var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/?*', function(req, res, next) {
    var requestPath = req.path.substr(1);
    var returnData = {};
    returnData["unix"] = null;
    returnData["natural"] = null;
    if(!isNaN(requestPath)){
        requestPath = parseInt(requestPath);
        returnData["unix"] = requestPath;
        returnData["natural"] = new Date(requestPath) + "";
    }else{
        requestPath = requestPath.replace(new RegExp("\%20","gm")," ");   
        if(new Date(requestPath) != "Invalid Date"){
            returnData["unix"] = Date.parse(requestPath);
            returnData["natural"] = new Date(requestPath) + "";
        }
    }
    res.send(returnData);
});

module.exports = router;
