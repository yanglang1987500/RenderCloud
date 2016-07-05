var express = require('express');
var Client = require('node-rest-client').Client;
var guid = require('guid');
var router = express.Router();
var client = new Client();
var when = require('when');
var jobDao = require('../daos/jobDao');
var urls = ['http://61.144.43.89:10103/api/jobs' ];


router.get('/getJobs', function (req, res, next) {
    if (req.session.isLogin) {
        jobDao.queryJob(function(arr){
            var result = [];
            arr.forEach(function(data){
                data = data.filter(function(item){
                    if(item.Props.User == req.session.userInfo.usercode){
                        item.__host = data.host;
                        return true;
                    }
                });
                result = result.concat(data);
            });
            res.json(result);
        });
    }
});
module.exports = router;
