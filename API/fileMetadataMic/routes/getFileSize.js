var express = require('express');
var router = express.Router();

var multer  = require('multer');
var upload = multer();

router.post('/', upload.single('avatar'), function(req, res, next) {
  var resData = {};
  resData["size"] = req.file.size;
  res.send(resData);
});

module.exports = router;
