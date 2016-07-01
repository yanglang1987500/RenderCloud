var express = require('express');
var Client = require('node-rest-client').Client;
var fs = require("fs");
var guid = require('guid');
var router = express.Router();
var client = new Client();
var when = require('when');
var urls = ['http://61.144.43.89:10103/api/jobs' ];


router.get('/getJobs', function (req, res, next) {
    if (req.session.isLogin) {
        var promiseArr = [],result = [];
        urls.forEach(function(url){
            promiseArr.push(queryJob(url));
        });
        when.join.apply(this,promiseArr).then(function(arr){
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
var args = {
    requestConfig: {
        timeout: 3000, //request timeout in milliseconds
        noDelay: true, //Enable/disable the Nagle algorithm
        keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
        keepAliveDelay: 1000 //and optionally set the initial delay before the first keepalive probe is sent
    },
    responseConfig: {
        timeout: 3000 //response timeout
    }
};
function queryJob(url){
    return when.promise(function(resolve){
        var req = client.get(url, args,function (data, response) {
            data = JSON.parse(data.toString());
            console.log('resolve url:'+url);
            ret(data);
        });
        req.on('requestTimeout', function (req) {
            console.log('request has expired');
            ret([]);
        });

        req.on('responseTimeout', function (res) {
            console.log('response has expired');
            ret([]);
        });

        req.on('error', function (err) {
            console.log('request error', err);
            ret([]);
        });
        function ret(data){
            data.host = url.match(/^(http[s]?:\/\/[^\/]*)\/.*$/)[1];
            resolve(data);
        }
    });
}

module.exports = router;
