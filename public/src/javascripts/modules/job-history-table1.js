/**
 * Created by yanglang on 2016/4/13.
 */

var jobHistory = require('./job-history');
var JobHistoryModule2 = function(){ };
//继承自作业分析类
JobHistoryModule2.prototype = $.extend({},jobHistory);
JobHistoryModule2.prototype.id = 'job-history-table1';

JobHistoryModule2.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('history-table1').setHeight(700).setWidth(780);

    this.$table = $('#main2>.tablecontainer').datagrid({
        url:'/history',
        method:'get',
        columns: [[{
            field:'date',
            title:'日期',
            width:200
        },{
            field:'comptime',
            title:'机时数',
            width:200
        }]],
        pagination: false,
        pageSize: 30,
        ctrlSelect: true,
        checkOnSelect: true,
        selectOnCheck: true,
        loadMsg: '正在查询，请稍候……',
        striped: true,
        fit: true,
        fitColumns: true
    });
};
JobHistoryModule2.prototype.refreshTable = function(options){
    this.$table.datagrid('reload',options);
};
var jobHistoryModule2 = new JobHistoryModule2();

Events.subscribe('onRefresh:job-history',function(option){
    jobHistoryModule2.refreshTable(option);
});

module.exports = jobHistoryModule2;