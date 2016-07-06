/**
 * Created by yanglang on 2016/4/13.
 */

var jobHistory = require('./job-history');
var echarts = require('../libs/echarts/echarts.common.min.js');
var JobHistoryModule1 = function(){ };

//继承自账户基类
JobHistoryModule1.prototype = $.extend({},jobHistory);
JobHistoryModule1.prototype.id = 'job-history-module1';

JobHistoryModule1.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('history-module1').setHeight(700).setWidth(780);

    var myChart = echarts.init($('#main',this.dom)[0]);
    myChart.setOption({
        backgroundColor: '#fff',
        series : [
            {
                name: '访问来源',
                type: 'pie',
                roseType: 'angle',
                radius: '55%',
                data:[
                    {value:400, name:'搜索引擎'},
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'}
                ]
            }
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    });
};

module.exports = new JobHistoryModule1();