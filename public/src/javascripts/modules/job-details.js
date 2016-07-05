/**
 * Created by yanglang on 2016/4/13.
 */

var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/job-details.scss');
var JobDetails = function () {
};

//继承自账户基类
JobDetails.prototype = $.extend({}, frameworkBase);
JobDetails.prototype.id = 'job-details';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
JobDetails.prototype.init = function (options) {
    var that = this;
    this.jobId = options.jobId;
    this.host = options.host;
    this.taskName = options.taskName;
    if (!this.jobId)
        throw new Error('请提供jobId');
    this.options = $.extend({}, options);
    that.setTitle('作业详情查询').setHeight($(window).height()*.7).setWidth($(window).width()*.6);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

JobDetails.prototype.loadBaseView = function () {
    var that = this;
    var key = '';
    var html = require('../../../../views/modules/job-details.html');
    this.render(html);
    var columns = require('../../../../configs/modules/jobDetailColumn.js');
    var $table = $('#taskTable').datagrid({
        url: '/getTask?jobId=' + this.jobId+'&host='+encodeURIComponent(this.host),
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
        fitColumns: true,
        loadFilter: function (data) {
            var tasks = data.Tasks, len = tasks.length, i = 0, result = [];
            for (; i < len; i++) {
                if (tasks[i].Frames.indexOf(key) != -1) {
                    result.push(tasks[i]);
                }
            }
            return {rows: result, total: result.length};
        },
        toolbar: '#detail_tb'
    });
    $('#detail-easyui-searchbox').searchbox({
        searcher: function (value, name) {
            key = value;
            $table.datagrid('load');
        },
        prompt: '请输入查询帧'
    });
    $('#detail_tb').on('click', '#export', function () {
        $('#exportFrame').attr('src', '/export?jobId=' + that.jobId+'&host='+encodeURIComponent(that.host)+'&taskName='+that.taskName.match(/(.*)(?=\.[^.]*)/g)[0]);
    });
};


module.exports = new JobDetails();