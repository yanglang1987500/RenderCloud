var _arr = [];
if(!Function.prototype.bind){
    Function.prototype.bind = function(context){
        var that = this;
        var args = _arr.slice.call(arguments,1);
        return function(){
            var _args = args.concat(_arr.slice.call(arguments,0));
            that.apply(context,_args);
        };
    };
}