/**
 * Created by yanglang on 2016/4/13.
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/jquery.easyui.min.js');
var echarts = require('../libs/echarts/echarts.common.min.js');
require('../../stylesheets/modules/job-history.scss');
require('../../stylesheets/easyui.css');
var HistoryJob = function(){ };

//继承自框架基类
HistoryJob.prototype = $.extend({},frameworkBase);
HistoryJob.prototype.id = 'job-history';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
HistoryJob.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('机时统计分析').setHeight(700).setWidth(780);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
};

HistoryJob.prototype.loadBaseView = function(){
    var key = '',that = this;
    this.loadFragment('/views/modules/job-history.html').then(function(html){
        that.render(html);
        that.bindEvents();
        var containerWidth = $(that.dom).width();
        $('#main',that.dom).width(containerWidth*.7-15);
        $('#main2',that.dom).width(containerWidth*.28-15);
        var module1 = require('./job-history-chart1');
        module1.init();
        var module2 = require('./job-history-table1');
        module2.init();
        Events.notify('onRefresh:job-history',{type:0});
    });

};
HistoryJob.prototype.bindEvents = function(){
    $('#jobHistoryGrainSelector',this.dom).on('change',function(){
        var value = $(this).val();
        Events.notify('onRefresh:job-history',{type:value});
    });
};


module.exports = new HistoryJob();