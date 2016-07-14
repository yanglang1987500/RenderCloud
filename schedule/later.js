/*Created by ChenZhang on 2016/7/4.*/
var express = require('express');
var later = require('later');
var mysql = require('mysql');
var jobDao = require('../daos/jobDao');
var Calendar = require('../libs/calendar');
var Guid = require('guid');
var Events = require('../framework/framework-events');
later.date.localTime();//获取当前的时间
console.log(new Date());
var composite = [{h:[23],m:[59]}];//定义一个固定的时间点
var schedule = {
    schedules:composite
};
var occurrences = later.schedule(schedule).next(10);
/*console.log(occurrences);
for(var i = 0; i < occurrences.length; i++) {
    console.log(occurrences[i]);
}*/
later.setInterval(function(){fetchJobData();},schedule);

function fetchJobData(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        port:'3306',
        database:'rendercloud',
        user     : 'root',
        password : '',
        //password : '123456'
    });
    connection.query("truncate job",function(err,result){
        connection.query("truncate jobdetails",function(err,result){
            jobDao.queryJob(function(arr){
                var result = [],jobArr = [],columns = require('../configs/modules/jobColumn');
                arr.forEach(function(data){
                    data = data.filter(function(item){
                        if(Calendar.getInstance(item['DateComp']).format('yyyyMMdd')=='20010101')
                            return;
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
                        (function(host,_id){
                            Events.queue(function(){
                                jobDao.queryJobDetails(host,_id,function(data){
                                    var columns = require('../configs/modules/jobDetailColumn');
                                    var detailArr = [];
                                    for (var i = 0; i < data.Tasks.length; i++) {
                                        var row = [Guid.raw()];
                                        for (var j = 0; j < columns.length; j++) {
                                            if(columns[j].field == 'singleTime'){
                                                row.push(columns[j].formatter(null,data.Tasks[i]));
                                            }else
                                                row.push(data.Tasks[i][columns[j].field]);
                                        }
                                        row.push(item._id);
                                        detailArr.push(row);
                                    }
                                    var detailsql = 'INSERT INTO jobdetails(id,frames,starttime,startren,comptime,progress,error,singletime,jobid) VALUES ?';
                                    connection.query(detailsql,[detailArr],function(){});
                                });
                            },50);
                        })(data.host,item._id);



                        jobArr.push(items);
                    });
                    result = result.concat(data);
                });
                var jobsql = 'INSERT INTO job(id,jobname,owner,framerange,starttime,endtime,process,sencefile) VALUES ?';
                connection.query(jobsql,[jobArr],function(){});
            });
        });
    });
}

fetchJobData();
