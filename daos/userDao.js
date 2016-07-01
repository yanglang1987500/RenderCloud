var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('10.175.9.167',27070,{auto_reconnect:true,poolSize:10});
var db = new mongodb.Db('deadline7db_Config',mongodbServer);

module.exports = {
    defaultPassword:'123456',
    queryUserInfoByName:function(userName,callback){
        db.open(function(){
            db.collection('UserInfo', function (err, collection) {
                collection.find({Name:userName}).toArray(function (err, userinfos) {
                    callback && callback(userinfos);
                });
            });
        });
    },
    queryUserPasswordByName:function(userName,callback){
        db.open(function(){
            db.collection('UserPassword', function (err, collection) {
                collection.find({username:userName}).toArray(function (err, userinfos) {
                    callback && callback(userinfos);
                });
            });
        });
    },
    modifyUserPasswordByName:function(userName,password,callback){
        db.open(function(){
            db.collection('UserPassword', function (err, collection) {
                collection.update({username:userName},{$set:{password:password}},{safe:true},function(err,result){
                    callback && callback(result);
                });
            });
        });
    },
    insertUserPassword:function(userName,password,callback){
        var arr = [{username:userName,password:password}];
        db.open(function(){
            db.collection('UserPassword', function (err, collection) {
                collection.insert(arr,{safe:true},function(err,result){
                    callback && callback(result);
                });
            });
        });
    },
    queryUserInfoMapByCode:function(code,callback){
        db.open(function(){
            db.collection('UserInfoMap', function (err, collection) {
                collection.find({code:code}).toArray(function (err, maps) {
                    callback && callback(maps);
                });
            });
        });
    },
    queryUserInfoMapByNickname:function(nickname,callback){
        db.open(function(){
            db.collection('UserInfoMap', function (err, collection) {
                collection.find({nickname:nickname}).toArray(function (err, maps) {
                    callback && callback(maps);
                });
            });
        });
    }
};