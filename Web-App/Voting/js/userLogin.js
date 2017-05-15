var request = require('request');

var loginModule = {};

loginModule.userAuthen = function(resolve, reject, codeData){
  var getTokenURL = "https://api.weibo.com/oauth2/access_token";
  var postData = {};
  postData.client_id = "468240043";
  postData.client_secret = "2768704e99da65f57c830d37820a775c";
  postData.grant_type = "authorization_code";
  postData.redirect_uri = "http://127.0.0.1:3000";
  postData.code = codeData;

  getTokenURL = getTokenURL + "?client_id=" + postData.client_id + "&client_secret=" + postData.client_secret
      + "&grant_type=" + postData.grant_type + "&redirect_uri=" + postData.redirect_uri + "&code=" + postData.code;
  request({
    url: getTokenURL,
    method: "POST",
  }, function (error, resData, body){
    if(error){
      failed(error);
    }else{
      resolve(JSON.parse(body));
    }        
  });
}

loginModule.getUserName = function(resolve, reject, access_token, uid){
  var getUserNameLink = "https://api.weibo.com/2/users/show.json?access_token=" + access_token + "&uid=" + uid;
  request({
    url: getUserNameLink,
    method: "GET",
  }, function (error, resData, body){
    if(error){
      failed(error);
    }else{
      resolve(JSON.parse(body));
    }        
  });
}

module.exports = loginModule;