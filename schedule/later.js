/*Created by ChenZhang on 2016/7/4.*/
var express = require('express');
var Client = require('node-rest-client').Client;
var later = require('later');
var mysql = require('mysql');
var jobDao = require('../daos/jobDao');
var Guid = require('guid');
later.date.localTime();//获取当前的时间
console.log(new Date());
var composite = [{h:[23],m:[59]}];//定义一个固定的时间点
var schedule = {
    schedules:composite
};
var occurrences = later.schedule(schedule).next(10);
console.log(occurrences);
for(var i = 0; i < occurrences.length; i++) {
    console.log(occurrences[i]);
}
later.setInterval(function(){fetchJobData();},schedule);

function fetchJobData(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        port:'3306',
        database:'rendercloud',
        user     : 'root',
        password : ''
    });
    connection.query("truncate job",function(err,result){
        connection.query("truncate jobdetails",function(err,result){
            jobDao.queryJob(function(arr){
                var result = [],jobArr = [],columns = require('../configs/modules/jobColumn');
                arr.forEach(function(data){
                    data = data.filter(function(item){
                        var items = [item._id];
                        for(var i = 0;i<columns.length;i++){
                            var field = columns[i].field;
                            var fields = field.split('.');
                            if(fields.length == 1){
                                items.push(item[field]);
                            }else{
                                items.push(item[fields[0]][fields[1]]);
                            }
                        }
                        jobDao.queryJobDetails(data.host,item._id,function(data){
                            var columns = require('../configs/modules/jobDetailColumn');
                            var detailArr = [];
                            for (var i = 0; i < data.Tasks.length; i++) {
                                var row = [Guid.raw()];
                                for (var j = 0; j < columns.length; j++) {
                                    if(columns[j].field == 'singleTime')
                                        continue;
                                    row.push(data.Tasks[i][columns[j].field]);
                                }
                                detailArr.push(row);
                            }
                            var detailsql = 'INSERT INTO jobdetails(id,frames,starttime,startren,comptime,progress,error) VALUES ?';
                            connection.query(detailsql,[detailArr],function(){});
                        });
                        jobArr.push(items);
                    });
                    result = result.concat(data);
                });
                console.log(jobArr.length);
                var jobsql = 'INSERT INTO job(id,jobname,owner,framerange,starttime,endtime,process,sencefile) VALUES ?';
                connection.query(jobsql,[jobArr],function(){});
            });
        });
    });
}
