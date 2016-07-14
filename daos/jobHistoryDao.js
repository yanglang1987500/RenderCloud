var mysql = require('mysql');
var when = require('when');
var connection = mysql.createConnection({
    host     : 'localhost',
    port:'3306',
    database:'rendercloud',
    user     : 'root',
    password : ''
});


module.exports = {
    /**
     * 统计机时
     * @param type 按月(0)还是按日(1)
     * @param callback 回调
     */
    sumComputerTime:function(type,owner,callback){
        var num = type?10:7;
        var sql = 'select sum(singletime) comptime,SUBSTR(b.comptime,1,'+num+') date ' +
            'from job a,jobdetails b ' +
            'where a.id = b.jobid and a.owner='+owner +
            ' group by date order by date';
        connection.query(sql,function(err,result){
            err ? console.log(err) : callback && callback(result);
        });
    }
};