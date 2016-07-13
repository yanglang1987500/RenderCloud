var express = require('express');
var router = express.Router();
var jobDao = require('../daos/jobDao');
var history = require('../daos/jobHistoryDao');

router.get('/history', function (req, res, next) {
    if (req.session.isLogin) {
        var type = req.query.type;
        history.sumComputerTime(type=='1'?type:0,function(results){
            res.json(results);
        });
    }
});

module.exports = router;
