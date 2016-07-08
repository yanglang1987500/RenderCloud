/**
 * Created by yanglang on 2016/4/13.
 */

var jobHistory = require('./job-history');
var echarts = require('../libs/echarts/echarts.common.min.js');
var JobHistoryModule2 = function(){ };

//继承自账户基类
JobHistoryModule2.prototype = $.extend({},jobHistory);
JobHistoryModule2.prototype.id = 'job-history-module2';

JobHistoryModule2.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('history-module2').setHeight(700).setWidth(780);

    var columns = require('../../../../configs/modules/jobColumn.js');
    var $table = $('#main2>.tablecontainer').datagrid({
        url: '/getJobs',
        method: 'get',
        columns: [columns],
        pagination: false,
        pageSize: 30,
        ctrlSelect: true,
        checkOnSelect: true,
        selectOnCheck: true,
        loadMsg: '正在查询，请稍候……',
        striped: true,
        fit: true,
        fitColumns: false
    });
};

module.exports = new JobHistoryModule2();