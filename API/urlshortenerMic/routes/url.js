var express = require('express');
var router = express.Router();

/* GET home page. */
var shortenArr = [];
router.get('/', function(req, res, next) {
    res.render('URL Shortener Microservice', { title: 'Express' });
});
router.get('/?*', function(req, res, next) {
    var requestPath = req.path.substr(1);
    if(isNaN(requestPath)){
        if(bUrlValid(requestPath)){
            var resData = {};
            resData["original_url"] = requestPath;

            if(shortenArr.indexOf(requestPath) != -1){
                resData["short_url"] =  req.get('host') + "/url/"+ shortenArr.indexOf(requestPath);   
            }else{
                shortenArr.push(requestPath);
                resData["short_url"] =  req.get('host') + "/url/"+ (shortenArr.length - 1);   
            }            
            res.send(resData); 
        }else{
            //invalid url path
            res.render('index', { title: 'URL Shortener Microservice' });
        }
    }else{
        if(parseInt(requestPath) > shortenArr.length){
            parseInt(requestPath)
            var resData = {};
            resData["error"] = "This url is not on the database.";
            res.send(resData);
        }else{
            var urlRedirect = shortenArr[parseInt(requestPath)];
            res.redirect(urlRedirect);
        }        
    }    
});

function bUrlValid(str){
    str = str.match(/^(http|https):\/\/.+\..+/i);
    if (str == null){
        return false;
    }else{
        return true;
    }
} 

module.exports = router;
