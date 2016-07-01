/**
 * Created by yanglang on 2016/4/13.
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/jquery.easyui.min.js');
require('../../stylesheets/modules/job.scss');
require('../../stylesheets/easyui.css');
var HistoryJob = function(){ };

//继承自账户基类
HistoryJob.prototype = $.extend({},frameworkBase);
HistoryJob.prototype.id = 'historyJob';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
HistoryJob.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('作业机时查询').setHeight(700).setWidth(780);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
};

HistoryJob.prototype.loadBaseView = function(){
    var key = '';
    var html = require('../../../../views/modules/job.html');
    this.render(html);
    /*var $table = $('#dataTable').datagrid({
        url:'/getHistoryJobs',
        method:'get',
        columns:[[
            {field:'_id',title:'作业ID',width:400},
            {field:'Props.User',title:'所有者',width:400},
            {field:'Props.Name',title:'作业名称',width:400},
            {field:'Props.Frames',title:'帧序范围',width:400},
            {field:'DateStart',title:'开始时间',width:400, formatter:function(val){
                return Calendar.getInstance(val).format('yyyyMMdd hh:mm:ss');
            }},
            {field:'DateComp',title:'结束时间',width:400, formatter:function(val){
                return Calendar.getInstance(val).format('yyyyMMdd hh:mm:ss');
            }},
            {field:'SnglTskPrg',title:'状态',width:400,formatter:function(val){
                return '<div style="width:100%;background:#F6FBFC;border:1px solid #9DBAC0;height:20px;text-align: center;line-height: 20px;position: relative"><span style="color: #3C3C3C;position:absolute;left:40%;top:0px;">'+val+'</span><div style="width:'+val.replace(/\s/gm,'')+';height:100%;background: #51C1DD"></div></div>';
            }},
            {field:'Aux',title:'场景文件',width:400}
        ]],
        pagination:false,
        pageSize:30,
        ctrlSelect:true,
        checkOnSelect:true,
        selectOnCheck:true,
        loadMsg:'正在查询，请稍候……',
        striped:true,
        fit:true,
        fitColumns:true,
        onDblClickRow:function(rowIndex, rowData){
            var jobDetails = require('./details');
            jobDetails.init({
                jobId:rowData._id,
                showType:'Pop'
            });

        },
        loadFilter:function(data){
            var array = data,len = data.length,i= 0,result = [];
            for(;i<len;i++){
                if(array[i]['Props']['Name'].indexOf(key)!=-1){
                    result.push(array[i]);
                }else if(array[i]['Props']['User'].indexOf(key)!=-1){
                    result.push(array[i]);
                }else if(array[i].Aux.indexOf(key)!=-1){
                    result.push(array[i]);
                }
            }
            return {rows:result,total:result.length};
        },
        toolbar: '#home_tb'
    });
    $('#home-easyui-searchbox').searchbox({
        searcher:function(value,name){
            key = value;
            $table.datagrid('load');
        },
        prompt:'请输关键字，如场景名、作业名等'
    });*/
};


module.exports = new HistoryJob();