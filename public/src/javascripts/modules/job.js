/**
 * Created by yanglang on 2016/4/13.
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/jquery.easyui.min.js');
require('../../stylesheets/modules/job.scss');
require('../../stylesheets/easyui.css');
var Job = function () {
};

//继承自框架基类
Job.prototype = $.extend({}, frameworkBase);
Job.prototype.id = 'job';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
Job.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('作业实时查询').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

Job.prototype.loadBaseView = function () {
    var that = this;
    var key = '';
    var html = require('../../../../views/modules/job.html');
    this.render(html);

    var columns = require('../../../../configs/modules/jobColumn.js');
    var $table = $('#dataTable').datagrid({
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
        fitColumns: false,
        onDblClickRow: function (rowIndex, rowData) {
            var jobDetails = Events.require('./modules/job-details');
            jobDetails.addCallback(function(){
                that.init(that.options);
            });
            jobDetails.init({
                jobId: rowData._id,
                host:rowData.__host,
                taskName:rowData.Aux[0],
                showType: 'Pop'
            });

        },
        loadFilter: function (data) {
            var array = data, len = data.length, i = 0, result = [];
            for (; i < len; i++) {
                if (array[i]['Props']['Name'].indexOf(key) != -1) {
                    result.push(array[i]);
                } else if (array[i]['Props']['User'].indexOf(key) != -1) {
                    result.push(array[i]);
                } else if (array[i].Aux.indexOf(key) != -1) {
                    result.push(array[i]);
                }
            }
            return {rows: result, total: result.length};
        },
        toolbar: '#home_tb'
    });
    $('#home-easyui-searchbox').searchbox({
        searcher: function (value, name) {
            key = value;
            $table.datagrid('load');
        },
        prompt: '请输关键字，如场景名、作业名等'
    });
  
};


module.exports = new Job();