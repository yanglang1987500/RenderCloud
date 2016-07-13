/**
 * Created by Administrator on 2016/6/15.
 */
var crypto = require('crypto');

module.exports = {
    returns:function(success,data){
        return {
            code:success?1:0,
            success:success,
            data:function() {
                return typeof data === 'string' ? {message: data} : data;
            }()
        };
    },
    md5:function(val){
        var md5 = crypto.createHash('md5');
        md5.update(val);
        return md5.digest('hex');
    }
};