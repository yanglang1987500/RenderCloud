var MongoClient = require('mongodb').MongoClient;


// Connection URL
var url = 'mongodb://10.175.9.167:27070/deadline7db_Config';
// Use connect method to connect to the Server

module.exports = {
    defaultPassword:'123456',
    queryUserInfoByName:function(userName,callback){
        MongoClient.connect(url, function(err, db) {
                db.collection('UserInfo', function (err, collection) {
                    collection.find({Name:userName}).toArray(function (err, userinfos) {
                        callback && callback(userinfos);
                    });
                });
        });
    },
    queryUserPasswordByName:function(userName,callback){
        MongoClient.connect(url, function(err, db) {
                db.collection('UserPassword', function (err, collection) {
                    collection.find({username: userName}).toArray(function (err, userinfos) {
                        callback && callback(userinfos);
                    });
                });
        });
    },
    modifyUserPasswordByName:function(userName,password,callback){
        MongoClient.connect(url, function(err, db) {
                db.collection('UserPassword', function (err, collection) {
                    collection.update({username: userName}, {$set: {password: password}}, {safe: true}, function (err, result) {
                        callback && callback(result);
                    });
                });
        });
    },
    insertUserPassword:function(userName,password,callback){
        var arr = [{username:userName,password:password}];

        MongoClient.connect(url, function(err, db) {
                db.collection('UserPassword', function (err, collection) {
                    collection.insert(arr, {safe: true}, function (err, result) {
                        callback && callback(result);
                    });
                });
        });
    },
    queryUserInfoMapByCode:function(code,callback){

        MongoClient.connect(url, function(err, db) {
                db.collection('UserInfoMap', function (err, collection) {
                    collection.find({code: code}).toArray(function (err, maps) {
                        callback && callback(maps);
                    });
                });
        });
    },
    queryUserInfoMapByNickname:function(nickname,callback){

        MongoClient.connect(url, function(err, db) {
                db.collection('UserInfoMap', function (err, collection) {
                    collection.find({nickname: nickname}).toArray(function (err, maps) {
                        callback && callback(maps);
                    });
                });
        });
    }
};