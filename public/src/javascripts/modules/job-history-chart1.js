/**
 * Created by yanglang on 2016/4/13.
 */

var jobHistory = require('./job-history');
var echarts = require('../libs/echarts/echarts.common.min.js');
var JobHistoryModule1 = function () {
};

//继承自作业分析类
JobHistoryModule1.prototype = $.extend({}, jobHistory);
JobHistoryModule1.prototype.id = 'job-history-chart1';

JobHistoryModule1.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('history-chart1').setHeight(700).setWidth(780);

    this.myChart = echarts.init($('#main', this.dom)[0]);
};

JobHistoryModule1.prototype.refreshChart = function (option) {
    var that = this;
    this.query('/history', option, function (results) {
        var xAxisData = [];
        var data1 = [];
        for (var i = 0; i < results.length; i++) {
            xAxisData.push(results[i].date);
            data1.push(results[i].comptime);
        }
        that.myChart.setOption(
            {
                backgroundColor:'#fff',
                legend: {
                    data: ['机时数'],
                    align: 'left',
                    top:5
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                tooltip: {},
                yAxis: {},
                xAxis: {
                    data: xAxisData,
                    silent: false,
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    name: '机时数',
                    type: 'bar',
                    data: data1
                }],
                color:['#FF6C3F']
            });
    });
};

JobHistoryModule1.prototype.resize = function () {
    this.myChart.resize();
};

var jobHistoryModule1 = new JobHistoryModule1();

Events.subscribe('onRefresh:job-history',function(option){
    jobHistoryModule1.refreshChart(option);
});
module.exports = jobHistoryModule1;