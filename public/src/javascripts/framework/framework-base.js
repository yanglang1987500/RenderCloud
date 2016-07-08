/**
 * 框架基类模块<br>
 * 提供一些基础的公共方法<br>
 * 所有模块都应继承自它<br>
 * @author yanglang
 * @version 1.0
 * @module framework-base
 */

require('../libs/utils');
var Events = require('./framework-events');
//为基类添加历史行为控制
require('./framework-history');

/**
 * 当前模块对象
 * @private
 * @property {Framework} _currentModel
 */
var _currentModel = null;


/**
 * 父模块列表
 */
var parentModels = [];
parentModels.hasModel = function (model) {
    var has = false;
    for (var i = 0; i < this.length; i++) {
        if (this[i] === model) {
            has = true;
            break;
        }
    }
    return has;
};


/**
 * 框架基类模块<br>
 * 提供一些基础的公共方法<br>
 * 所有模块都应继承自它<br>
 * 此基础模块将会接管所有子模块的展现工作<br>
 * 只需设置showType类型，就可以多种形态进行展现<br>
 * 目前支持弹窗与账户中心嵌入两种形式，日后有需要可以随时增加<br>
 * 此套架构的优点在于：解耦目前所有模块，功能上各模块互相提供API接口进行调用，各模块API由各自统一进行维护。<br>
 * 此外，由于采用AMD模式架构，所以理论上支持无限量模块数目进行加载，浏览器的加载速度仍然飞快，扩展性非常好。<br>
 * @version 1.0
 * @author 杨浪
 * @class Framework
 * @constructor
 *
 */
var Framework = function () {
    this.baseTitle = window.document.title;
};

Framework.prototype = {
    /**
     *
     * !!== 定义规范 ==!!，<br>
     * 必须实现此方法作为入口，<br>
     * @method init
     * @param {Object} options 初始参数(对象)
     *
     */
    init: function (options) {
        //初始化
        this.setCurrent();
        //由框架设置展现形式
        this.setShowType($.extend({}, options).showType);
        Events.notifyWith('init',this, options);

    },
    /**
     * 对Framework框架进行扩展
     * @method extend 扩展模块
     * @param model 模块id 或 id列表
     * @param callback 回调方法
     */
    extend: function (model) {
        var that = this;
        var models = [];
        if (!$.isArray(model))
            models.push(model);
        else
            models = model;

        for(var i = 0;i<models.length;i++){
            if (!parentModels.hasModel(models[i])) {
                parentModels.push(models[i]);
            }
        }
    },
    /**
     * 移除扩展
     * @method excludeExtension
     * @param modelId 扩展id
     */
    excludeExtension: function (modelId) {
        var that = this;
        for (var i = 0; i < parentModels.length; i++) {
            if (parentModels[i].id == modelId) {
                parentModels.removeAt(i);
                i--;
            }
        }
    },
    /**
     * 批量移除扩展
     * @method excludeExtensions
     * @param modelIds 扩展id列表
     */
    excludeExtensions: function (modelIds) {
        for (var i = 0; i < modelIds.length; i++) {
            this.excludeExtension(modelIds[i]);
        }
    },
    /**
     * 执行扩展模块的接口方法
     * @method _callExtendInterface
     * @param funName 接口方法名
     * @param param 可选参数
     */
    _callExtendInterface: function (funName, param) {
        if (!parentModels)
            return;
        for (var i = 0; i < parentModels.length; i++) {
            if (parentModels[i][funName] && $.isFunction(parentModels[i][funName]))
                parentModels[i][funName].call(this, param);
        }
    },
    /**
     * 当前模块被切换掉时，模块可以选择拒绝，
     * 默认同意<br>
     * 这是一个预留接口<br>
     * 有相应需求的模块实现此方法即可。<br>
     * 目前只针对账户中心实现了这个接口的判断，以供左侧菜单使用<br>
     * @method onClose
     * @param {Function} callback 回调方法 同样返回true或false
     * @param {Boolean} isSame 是否仍然是同一个模块进行刷新操作
     * @return {Boolean} true同意 false拒绝
     */
    onClose: function (callback, isSame) {
        return true;
    },
    /**
     * 设置应用标题
     * @method setBaseTitle
     * @chainable
     * @param {String} baseTitle 标题
     * @return {Framework} self
     */
    setBaseTitle: function (baseTitle) {
        this.baseTitle = baseTitle;
        return this;
    },
    /**
     * 获取应用标题
     * @method getBaseTitle
     * @chainable
     * @return {String} baseTitle 标题
     */
    getBaseTitle: function () {
        return this.baseTitle ? this.baseTitle : '未知标题';
    },
    /**
     * 设置标题（仅弹窗时用）
     * @method setTitle
     * @chainable
     * @param {String} title 标题
     * @return {Framework} self
     */
    setTitle: function (title) {
        this.title = title;
        return this;
    },
    /**
     * 获取标题（仅弹窗时用）
     * @method getTitle
     * @chainable
     * @return {String} title 标题
     */
    getTitle: function () {
        return this.title ? this.title : '未知标题';
    },
    /**
     * 设置对话框宽度（仅弹窗时用）
     * @method setWidth
     * @chainable
     * @param {Number} width 弹窗宽度
     * @return {Framework} self
     */
    setWidth: function (width) {
        this.width = width;
        return this;
    },
    /**
     * 获取对话框宽度（仅弹窗时用）
     * @method getWidth
     * @chainable
     * @return {Number} width 弹窗宽度
     */
    getWidth: function () {
        return this.width ? this.width : 400;
    },
    /**
     * 设置对话框高度（仅弹窗时用）
     * @method setHeight
     * @chainable
     * @param {Number} height 弹窗高度
     * @return {Framework} self
     */
    setHeight: function (height) {
        this.height = height;
        return this;
    },
    /**
     * 获取对话框高度（仅弹窗时用）
     * @method getHeight
     * @chainable
     * @return {Number} height 弹窗高度
     */
    getHeight: function () {
        return this.height ? this.height : 400;
    },
    /**
     * 设置是否需要标题栏（仅弹窗时用）
     * @method setNeedtitle
     * @chainable
     * @param {Boolean} flag 弹窗是否需要显示标题
     * @return {Framework} self
     */
    setNeedtitle: function (flag) {
        this.needtitle = flag !== undefined ? flag : true;
        return this;
    },
    /**
     * 是否需要标题栏（仅弹窗时用）
     * @method isNeedtitle
     * @chainable
     * @return {Boolean}
     */
    isNeedtitle: function () {
        //默认有标题栏
        return this.needtitle === undefined ? true : this.needtitle;
    },
    /**
     * 设置展现形式
     * @method setShowType
     * @chainable
     * @param {String} type 模块展现形式
     * 'Normal' 账户中心mainview模式<br>
     * 'Pop' 弹出框模式<br>
     * 'Container' 自定义容器嵌入模式<br>
     * @returns {Framework} self
     */
    setShowType: function (type) {
        this.showType = (type ? type : 'Normal');
        return this;
    },
    /**
     * 获取展现形式<br>
     * 默认为Normal 账户中心的形式进行展现
     * @method getShowType
     * @chainable
     * @return {String} showType 模块展现形式
     */
    getShowType: function () {
        return this.showType === undefined ? 'Normal' : this.showType;
    },
    /**
     * 获取显示区域容器对象
     * @method getContainer
     * @return {Dom} dom容器对象
     */
    getContainer: function () {
        return this.dom;
    },
    /**
     * 加载页面片段
     * @param url
     * @param _param
     * @param callback
     */
    loadFragment:function(url,_param,callback){
        var $def = $.Deferred();
        $.get(url,function(data){
            callback&&callback(data);
            $def.resolve(data);
        });
        return $def.promise();
    },
    /**
     * post查询，异步执行，<br>
     * 返回json。<br>
     * @method query
     * @async
     * @param {String} url 查询地址
     * @param _param 参数对象 可选
     * @param {Function} _callback 回调方法 可选
     */
    query: function (url, _param, _callback) {
        var that = this, aLen = arguments.length, callback, param;
        if (aLen == 2) {
            if ($.isFunction(_param)) {
                callback = _param;
            }
        } else if (aLen == 3) {
            param = _param, callback = _callback;
        }
        return this._doPostJson(url, param, callback, true);
    },
    /**
     * post查询 同步执行<br>
     * 返回json<br>
     * @method querySync
     * @param {String} url 查询地址
     * @param _param 参数对象 可选
     * @param {Function} _callback 回调方法 可选
     */
    querySync: function (url, _param, _callback) {
        var that = this, aLen = arguments.length, callback, param;
        if (aLen == 2) {
            if ($.isFunction(_param)) {
                callback = _param;
            }
        } else if (aLen == 3) {
            param = _param, callback = _callback;
        }
        return this._doPostJson(url, param, callback, false);
    },

    /**
     * 执行post查询<br>
     * 返回json<br>
     * 内部使用<br>
     * @method _doPostJson
     * @private
     * @param {String} url 查询地址
     * @param param 参数对象
     * @param {Function} callback 回调方法
     * @param {Boolean} async 是否异步
     */
    _doPostJson: function (url, param, callback, async) {
        var ajax = $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            async: async,
            data: param,
            success: function (json) {
                if (callback)
                    callback(json);
            },
            error: function(){
                console.log("error");
            }
        });
        return ajax;
    },
    /**
     * 设置显示区域容器的内容<br>
     * 当使用此方法时，会自动按照setShowType所设定的展现方式进行展现<br>
     * 当未设置setShowType时，默认使用Normal账户中心嵌入式进行展现<br>
     * 设置为Pop时，会使用弹窗控件进行弹窗展示
     * 设置为Container时，会使用传入的dom容器进行嵌入展示
     * @method setContainer
     * @param data html数据
     * @return {Dom} dom容器对象
     */
    render: function (data) {
        var that = this;
        switch (this.getShowType()) {
            case 'Normal':
                var $mainview = $("#framework-content-main");
                $mainview.html(data);
                that.dom = $mainview;
                Events.notifyWith('onRendered',that,that.dom);
                return that.dom;
            case 'Pop':
                var pop = $('#framework_dialog').dialog({
                    title: this.getTitle(),
                    width: this.getWidth(),
                    height: this.getHeight(),
                    closed: false,
                    content:data,
                    modal: true,
                    collapsible:true,
                    minimizable:true,
                    maximizable:true,
                    maximized:false,
                    resizable:true,
                    onBeforeClose : function() {
                        that._closeDialog();
                        return false;
                    }
                });
                that.dom = $('#framework_dialog>div');
                pop.parent().addClass('uk-animation-scale-up').next().addClass('uk-animation-scale-up');
                that.pop = pop;
                Events.notifyWith('onRendered',that, that.dom);
                return that.dom;
        }
    },
    _closeDialog:function(){
        var that = this;
        if(this.pop){
            this.pop.parent().removeClass('uk-animation-scale-up').next().removeClass('uk-animation-scale-up');
            setTimeout(function(){
                that.pop.parent().addClass('uk-animation-reverse uk-animation-scale-up').next().addClass('uk-animation-reverse uk-animation-scale-up');
                setTimeout(function(){
                    that.pop.dialog('destroy');
                    that.pop = null;
                    $('<div id="framework_dialog"></div>').appendTo($('body'));
                },200);
            },50);

        }
    },
    /**
     * 添加回调方法<br>
     * 一般来说，当调用某个模块进行处理某项业务时，其处理完毕之后需要一个回调通知，调用此方法添加即可，同一个模块可以添加多个回调方法。<br>
     * 模块处理应遵循业务处理完毕之后调用自身继承下来的finish方法以声明此模块任务结束。<br>
     * @method addCallback
     * @chainable
     * @param {Function} callback 方法
     */
    addCallback: function (callback) {
        if (!this._callbacks)
            this._callbacks = [];
        this._callbacks.push({
            model: this,
            func: callback
        });
        return this;
    },
    /**
     * 清空回调堆栈
     * @method clearCallback
     */
    clearCallback: function () {
        if (this._callbacks)
            this._callbacks.length = 0;
    },
    /**
     * 模块任务结束<br>
     * 此方法的意义在于，当前模块结束对主视图的持有<br>
     * @method finish
     * @chainable
     * @return {Framework} self
     */
    finish: function () {
        if (this._callbacks) {
            var callbackcount = this._callbacks.length;
        } else
            var callbackcount = 0;

        if (this.getShowType() === 'Pop') {
            if (this.pop != null)
                this._closeDialog();

        }
        Events.notifyWith('onFinished',this);

        if (this._callbacks) {
            callbackcount != 0 ? this._executeCallback.apply(this, arguments) : '';
            this._callbacks.length = 0;//清空回调
        }
        return this;
    },
    /**
     * 执行回调方法列表
     * @method _executeCallback
     * @private 内部使用
     */
    _executeCallback: function () {
        var callbacks = this._callbacks;
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].func.apply(this, arguments);
        }
    },
    /**
     * 设置当前模块<br>
     * 此方法的意义在于在有多个弹窗模块共存时，以声明模块当前模块。<br>
     * 内部若如果存在账户中心菜单选中的回调方法，则调用。
     * @method setCurrent
     */
    setCurrent: function () {
        _currentModel = this;
    },
    /**
     * 获取当前模块
     * @method getCurrent
     * @return {Framework} Account的子类对象
     */
    getCurrent: function () {
        return _currentModel;
    }
};




module.exports = new Framework();











