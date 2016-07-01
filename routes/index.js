var express = require('express');
var Client = require('node-rest-client').Client;
var fs = require("fs");
var guid=require('guid');
var router = express.Router();
var client = new Client();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.isLogin){
      res.render('index');
  }
  else
    res.redirect('/login');
});


module.exports = router;
