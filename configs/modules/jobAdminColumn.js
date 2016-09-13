typeof window == 'undefined' && (Calendar = require('../../libs/calendar'));
function analyseName(name){
    var date = name.substr(0,10),name = name.substr(11,name.length);
    var keys = name.split('-'),oper = keys.pop();
    var la1 = keys.pop(),la2 = keys.pop(),operSys = '---', frames = '---';
    if(isNaN(la1) || isNaN(la2)){
        //存在操作平台
        operSys = la2+'-'+la1;
        frames = [keys.pop(),keys.pop()].reverse().join('-');
    }else{
        //不存在操作平台 那么la1 la2则为帧序
        frames = la2+'-'+la1;
    }
    var file = keys.join('-');
    return {date:date,oper:oper,operSys:operSys,frames:frames,file:file};
}

module.exports = [
    {field: 'Oper', title: '操作员', width: 100,formatter:function(val,row){
        return analyseName(row.Props.Name)['oper'];
    }},
    {field: 'Aux.0', title: '镜头名称', width: 250,formatter:function(val,row){
        var prop = analyseName(row.Props.Name);
        return prop.file;
    }},
    {field: 'Props.Frames', title: '帧序', width: 100},
    {field: 'Props.Tasks', title: '总帧数', width: 100},
    {
        field: 'RenderTime', title: '渲染时间(h:m:s)', width: 100, formatter: function (val,row) {
        var time =  (Calendar.getInstance(row.DateComp).getTime() - Calendar.getInstance(row.DateStart).getTime()) ;
        if(time<=0)
            return '0:00:00';
        return Calendar.formatMillisecond(time);
        /*var fmtH = ((time/(60*60)-1)>0?Math.floor(time/(60*60)):0);
        var fmtM = Math.floor((time/60)%60);
        var fmtS = (time%60);
        var fmt = fmtH+":"+((fmtM+'').length==1?('0'+fmtM):fmtM)+":"+((fmtS+'').length==1?('0'+fmtS):fmtS);
        return fmt;*/
    }
    },
    {
        field: 'RenderTime2', title: '渲染时间(h)', width: 100, formatter: function (val,row) {
        var time =  (Calendar.getInstance(row.DateComp).getTime() - Calendar.getInstance(row.DateStart).getTime())/1000;
        if(time<=0)
            return 0;
        return (time/(60*60)).toFixed(2);
    }
    },
    {field: 'Props.User', title: '客户名称', width: 100},
    {field: 'TaskCommitTime', title: '任务提交时间', width: 160,formatter:function(val,row){
        return analyseName(row.Props.Name)['date'];
    }},{field: 'OperSys', title: '操作平台', width: 200,formatter:function(val,row){
        return analyseName(row.Props.Name)['operSys'];
    }}
];