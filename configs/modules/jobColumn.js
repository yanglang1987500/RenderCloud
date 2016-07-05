module.exports = [
    {field: 'Props.Name', title: '作业名称', width: 350},
    {field: 'Props.User', title: '所有者', width: 150},
    {field: 'Props.Frames', title: '帧序范围', width: 200},
    {
        field: 'DateStart', title: '开始时间', width: 200, formatter: function (val) {
        return Calendar.getInstance(val).format('yyyyMMdd HH:mm:ss');
    }
    },
    {
        field: 'DateComp', title: '结束时间', width: 200, formatter: function (val) {
        return Calendar.getInstance(val).format('yyyyMMdd HH:mm:ss');
    }
    },
    {
        field: 'SnglTskPrg', title: '状态', width: 200, formatter: function (val) {
        return '<div style="width:100%;background:#F6FBFC;border:1px solid #9DBAC0;height:20px;text-align: center;line-height: 20px;position: relative"><span style="color: #3C3C3C;position:absolute;left:40%;top:0px;">' + val + '</span><div style="width:' + val.replace(/\s/gm, '') + ';height:100%;background: #51C1DD"></div></div>';
    }, formatter_back: function (val) {
        return val;
    }
    },
    {field: 'Aux', title: '场景文件', width: 350}
];