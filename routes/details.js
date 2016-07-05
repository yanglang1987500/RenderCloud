var express = require('express');
var Client = require('node-rest-client').Client;
var fs = require("fs");
var guid = require('guid');
var xlsx = require('node-xlsx');
var router = express.Router();
var client = new Client();
var jobDao = require('../daos/jobDao');
var Calendar = require('../libs/calendar.js');


/* GET home page. */
router.get('/details', function (req, res, next) {
    if (req.session.isLogin) {
        var jobId = req.query.jobId;
        res.render('details', {jobId: jobId});
    }
    else
        res.redirect('/login');
});

router.get('/getTask', function (req, res, next) {
    if (req.session.isLogin) {

        var host = decodeURIComponent(req.query.host);
        host = host ? host : 'http://10.175.9.15:8080/';
        console.log('call:'+host+'/api/tasks?JobID=' + req.query.jobId);
        jobDao.queryJobDetails(host,req.query.jobId,function(data){
            res.json(data);
        });
    }
});

router.get('/export', function (req, res, next) {
    if (req.session.isLogin) {
        var host = decodeURIComponent(req.query.host);
        var taskName = req.query.taskName;
        host = host ? host : 'http://10.175.9.15:8080/';
        console.log('call:'+host+'/api/tasks?JobID=' + req.query.jobId);
        jobDao.queryJobDetails(host,req.query.jobId,function(data){
            //加载表格列配置文件
            var columns = require('../configs/modules/jobDetailColumn');
            var datas = [];
            var total_time = 0;
            var titles = [];
            columns.forEach(function (obj) {
                titles.push(obj.title);
            });
            datas.push(titles);
            for (var i = 0; i < data.Tasks.length; i++) {
                var row = [];
                for (var j = 0; j < columns.length; j++) {
                    var formatter = columns[j].formatter_back ? columns[j].formatter_back : columns[j].formatter;
                    row.push(formatter ? formatter(data.Tasks[i][columns[j].field],data.Tasks[i]) : data.Tasks[i][columns[j].field]);
                    if(columns[j].field == 'singleTime'){
                        total_time += formatter(data.Tasks[i][columns[j].field],data.Tasks[i]);
                    }
                }
                datas.push(row);
            }
            //加载总机时
            total_time = total_time / 3600;
            total_time = total_time.toFixed(2);
            var last_row = ['总机时(h)', total_time];
            datas.push(last_row);

            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=" + taskName+ ".xlsx");
            var buffer = xlsx.build([{name: "mySheetName", data: datas}]);
            res.end(buffer, 'binary');
        });
    }
});
module.exports = router;
