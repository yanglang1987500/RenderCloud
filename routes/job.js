var express = require('express');
var Client = require('node-rest-client').Client;
var guid = require('guid');
var router = express.Router();
var client = new Client();
var when = require('when');
var jobDao = require('../daos/jobDao');

var fs = require("fs");
var guid = require('guid');
var xlsx = require('node-xlsx');

router.get('/getJobs', function (req, res, next) {
    if (req.session.isLogin) {
        jobDao.queryJob(function(arr){
            var result = [];
                arr.forEach(function(data){
                    data = data.filter(function(item){
                    if(item.Props.User == req.session.userInfo.usercode || req.session.userInfo.usercode == 'admin'){
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
router.get('/jobExport', function (req, res, next) {
    if (req.session.isLogin) {
        jobDao.queryJob(function(arr){
            var result = [];
            arr.forEach(function(data){
                data = data.filter(function(item){
                    if(item.Props.User == req.session.userInfo.usercode || req.session.userInfo.usercode == 'admin'){
                        item.__host = data.host;
                        return true;
                    }
                });
                result = result.concat(data);
            });
            //加载表格列配置文件
            var columns = require('../configs/modules/jobAdminColumn');
            var datas = [];
            var titles = [];
            columns.forEach(function (obj) {
                titles.push(obj.title);
            });
            datas.push(titles);
            for (var i = 0; i < result.length; i++) {
                var row = [];
                for (var j = 0; j < columns.length; j++) {
                    var formatter = columns[j].formatter_back ? columns[j].formatter_back : columns[j].formatter;
                    row.push(formatter ? formatter(result[i][columns[j].field],result[i]) : function(){
                        if(columns[j].field.indexOf('.')!=-1){
                            var tmps = columns[j].field.split('.');
                            return result[i][tmps[0]][tmps[1]];
                        }
                        result[i][columns[j].field];
                    }());
                }
                datas.push(row);
            }

            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=job.xlsx");
            var buffer = xlsx.build([{name: "mySheetName", data: datas}]);
            res.end(buffer, 'binary');
        });
    }
});
module.exports = router;
