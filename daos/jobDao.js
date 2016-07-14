var urls = ['http://localhost:10086/api/jobs','http://10.142.100.32:8080/api/jobs', 'http://10.142.100.70:8080/api/jobs'];
var Client = require('node-rest-client').Client;
var client = new Client();
var when = require('when');
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
var count = 0;
var count2 = 0;
module.exports = {
    queryJob:function(callback){
        var promiseArr = [],result = [];
        urls.forEach(function(url){
            promiseArr.push(queryJob(url));
        });
        when.join.apply(this,promiseArr).then(function(arr){
            callback && callback(arr);
        });

        function queryJob(url){
            return when.promise(function(resolve){
                var req = client.get(url, args,function (data, response) {
                    data = JSON.parse(data.toString());
                    //console.log('resolve url:'+url);
                    ret(data);
                });
                req.on('requestTimeout', function (req) {
                    //console.log('request has expired');
                    ret([]);
                });

                req.on('responseTimeout', function (res) {
                    //console.log('response has expired');
                    ret([]);
                });

                req.on('error', function (err) {
                    //console.log('request error', err);
                    ret([]);
                });
                function ret(data){
                    data.host = url.match(/^(http[s]?:\/\/[^\/]*)\/.*$/)[1];
                    resolve(data);
                }
            });
        }
    },
    queryJobDetails:function(host,jobId,callback){
        console.log(count++);
        client.get(host+'/api/tasks?JobID=' + jobId, function (data, response) {
            callback && callback(JSON.parse(data.toString()));
        });
    }
};