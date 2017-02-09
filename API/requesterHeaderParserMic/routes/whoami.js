var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var ipAddress = req.connection.remoteAddress
  var language = req.headers["accept-language"];
  var OSInformation = req.headers["user-agent"]

  returnData = {};
  returnData["ip"] = ipAddress;
  returnData["language"] = language.substring(0, language.indexOf(","));
  returnData["OS"] = OSInformation.substring(OSInformation.indexOf("(") + 1, OSInformation.indexOf(")"));

  res.send(returnData);
});

module.exports = router;
