var express = require('express');
var login = require('../js/userLogin.js');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
	var codeData = req.query.code;
	if(codeData){
		new Promise((loginSuccess, loginFailed) => {
      login.userAuthen(loginSuccess, loginFailed, codeData);
		}).then((authenMsg) => {
      if(authenMsg.error){
        console.log("Login Failed");
      }else{
        new Promise((getMsgSuccess, getMsgFailed) => {
          login.getUserName(getMsgSuccess, getMsgFailed, authenMsg.access_token, authenMsg.uid);
        }).then((userMsg) => {
          console.log(userMsg.name);
        });
      }
      res.redirect("http://127.0.0.1:3000");
		});
	}else{
		res.render('index', { title: 'Express' });
	}
});

module.exports = router;