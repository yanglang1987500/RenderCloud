typeof window == 'undefined' && (Calendar = require('../../libs/calendar'));
module.exports = [
    {
        field: 'Frames', title: '帧序', width: 400, formatter: function (val) {
        var array = [];
        array = val.split(/-/);
        if (array[0] == array[1]) {
            return array[0];
        } else {
            return val;
        }
    }
    },
    {
        field: 'Start', title: '任务开始时间', width: 400, formatter: function (val) {
        return Calendar.getInstance(val).format('yyyyMMdd HH:mm:ss');
    }
    },
    {
        field: 'StartRen', title: '渲染开始时间', width: 400, formatter: function (val) {
        return Calendar.getInstance(val).format('yyyyMMdd HH:mm:ss');
    }
    },
    {
        field: 'Comp', title: '任务完成时间', width: 400, formatter: function (val) {
        return Calendar.getInstance(val).format('yyyyMMdd HH:mm:ss');
    }
    },
    {
        field: 'Prog', title: '进度', width: 400,
        formatter: function (val) {
            return '<div style="width:100%;background:#F6FBFC;border:1px solid #9DBAC0;height:20px;text-align: center;line-height: 20px;position: relative"><span style="color: #3C3C3C;position:absolute;left:40%;top:0px;">' + val + '</span><div style="width:' + val.replace(/\s/gm, '') + ';height:100%;background: #51C1DD"></div></div>';
        },
        formatter_back: function (val) {
            return val;
        }
    },
    {field: 'Errs', title: '错误', width: 400},
    {
        field: 'singleTime', title: '任务时间', width: 400, formatter: function (val, row) {
        return (Calendar.getInstance(row.Comp).getTime() - Calendar.getInstance(row.Start).getTime()) / 1000;
    }
    }
];