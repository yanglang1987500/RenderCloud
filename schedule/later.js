/*Created by ChenZhang on 2016/7/4.*/
var express = require('express');
var Client = require('node-rest-client').Client;
var later = require('later');
later.date.localTime();//获取当前的时间
console.log(new Date());
var composite = [{h:[9],m:[41]}];//定义一个固定的时间点
var schedule = {
    schedules:composite
};
var sche = later.schedule(schedule);

var occurrences = later.schedule(schedule).next(10);
console.log(occurrences);
for(var i = 0; i < occurrences.length; i++) {
    console.log(occurrences[i]);
}
var excel=later.setInterval(function(){test(2)},schedule);

function test(val){
    console.log(val);
    //TODO delete数据库表里的数据 再查询新数据插入
}//方法的描述
//test方法的作用，delete之前的数据，获取打印这一次的时刻和在这个时刻更新的数据