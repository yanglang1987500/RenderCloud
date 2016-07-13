module.exports = [
    {field: 'Props.Name', title: '作业名称', width: 350},
    {field: 'Props.User', title: '所有者', width: 80},
    {field: 'Props.Frames', title: '帧序范围', width: 200},
    {
        field: 'DateStart', title: '开始时间', width: 160, formatter: function (val) {
        return Calendar.getInstance(val).format('yyyyMMdd HH:mm:ss');
    }
    },
    {
        field: 'DateComp', title: '结束时间', width: 160, formatter: function (val) {
        var value = Calendar.getInstance(val).format('yyyyMMdd HH:mm:ss');
        if(value == '20010101 00:00:00')
            return "----"
        else
            return value;
    }
    },
    {field: 'Aux.0', title: '场景文件', width: 300},
    {
        field: 'SnglTskPrg', title: '状态', width: 100, formatter: function (val,row) {
        var value = Calendar.getInstance(row.DateComp).format('yyyyMMdd HH:mm:ss');
        if(value == '20010101 00:00:00')
            return "正在运行"
        else
            return '已完成';
    }, formatter_back: function (val) {
        return val;
    }
    }
];