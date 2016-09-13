/**
 * Created by yanglang on 2016/4/13.
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/jquery.easyui.min.js');
require('../../stylesheets/modules/job.scss');
require('../../stylesheets/easyui.css');
var JobAdmin = function () {
};

//继承自框架基类
JobAdmin.prototype = $.extend({}, frameworkBase);
JobAdmin.prototype.id = 'job-admin';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
JobAdmin.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('管理员实时查询').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

JobAdmin.prototype.loadBaseView = function () {
    var that = this;
    var key = '';
    var html = require('../../../../views/modules/job-admin.html');
    this.render(html);

    var columns = require('../../../../configs/modules/jobAdminColumn.js');
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
    $('#adminJob').on('click', '#export', function () {
        $('#exportFrame').attr('src', '/jobExport');
    });
  
};


module.exports = new JobAdmin();