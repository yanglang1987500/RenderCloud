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

    var myChart = echarts.init($('#main2',this.dom)[0]);
    myChart.setOption({
        backgroundColor: '#fff',
        series : [
            {
                name: '访问来源2',
                type: 'pie',
                roseType: 'angle',
                radius: '55%',
                data:[
                    {value:400, name:'搜索引擎2'},
                    {value:335, name:'直接访问2'},
                    {value:310, name:'邮件营销2'},
                    {value:274, name:'联盟广告2'},
                    {value:235, name:'视频广告2'}
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

module.exports = new JobHistoryModule2();