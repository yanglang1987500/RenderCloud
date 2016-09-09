/**
 * Created by yanglang on 2016/4/13.
 */
require('./libs/jquery.min.js');
require('./libs/calendar.js');
require('./libs/sweetalert.min');
require('../stylesheets/sweetalert.css');
require('../stylesheets/index.scss');

require('./libs/utils');
var prefix = './modules/';
var Events = require('./framework/framework-events');

Events.addMethod('require',function(moduleId,options){
    if(moduleId.indexOf(prefix)=='-1'){
        moduleId = prefix + moduleId;
    }
    return require(moduleId);
}).subscribe('onSelectMenu',function(moduleId){
    if(moduleId.indexOf(prefix)=='-1'){
        moduleId = prefix + moduleId;
    }
    $('#menu>li').each(function(){
        var $this = $(this);
        if($this.attr('data-modules') == (moduleId)){
            $('#menu>li').removeClass('actived');
            $this.addClass('actived');
            return false;
        }
    });
});
var urlParam = $.getUrlParamObject();
!urlParam.init && (urlParam.init = 'job')
var initModule = Events.notify('onSelectMenu',urlParam.init).require(urlParam.init);
initModule.init({from:'init'});

$(function(){
    $('#menu>li').click(function(){
        var $this = $(this);
        var _module = $this.attr('data-modules');
        Events.notify('onSelectMenu',_module).require(_module).init({from:'click'});
    });
    $('#logoutBtn').click(function(){
        window.location.href = '/logout';
    });
    $('#returnBtn').click(function(){
        window.history.go(-1);
    });
    $('#nextBtn').click(function(){
        window.history.go(1);
    });
    $('#userInfo').click(function(){
    });
    $('#modifyPassword').click(function(){
        Events.require('passwordModify').init({showType:'Pop'});
    });
});

