"use strict";

define(["jquery"],function($){	

	var _sNote = "<!-- >>> @note >>> -->",
		_eNote = "<!-- <<< @note <<<-->";

	var _evtFns = {},
		_fnImpl = {};

	//覆写jquery的html方法
	$.prototype.html = function(oriHtml){
		return function(){
			var self = this;
			oriHtml.apply(self,arguments);
			if(arguments[1]!==undefined){
				var fileName = arguments[1];
				$(self).prepend(_sNote.replace(/@note/,fileName));
				$(self).append(_eNote.replace(/@note/,fileName));
			}
		}
	}($.prototype.html);

	//触发消息(一个消息对应多个事件)
	function trigger(){
		var key = Array.prototype.shift.call(arguments);
		var fns = _evtFns[key];
		if(!fns || 0===fns.length){
			return false;
		}
		for(var i=0,fn; fn=fns[i++];){
			fn.apply(this, arguments);
		}
	}

	//请求消息(一个消息对应一个实现)
	function request(){
		var key = Array.prototype.shift.call(arguments);
		var fn  = _fnImpl[key];
		if(fn instanceof Function){
			return fn.apply(this, arguments);
		}else{
			return false
		}
	}

	//绑定事件函数（多个）
	function bind(key, fns){
		if(fns instanceof Array){
			for(var i in fns){
				doBind(key, fns[i]);
			}
		}else{
			doBind(key, fns);
		}
	}

	//绑定事件函数
	function doBind(key, fn){
		if(!(fn instanceof Function))
			return;
		_evtFns[key] = _evtFns[key] || [];
		_evtFns[key].push(fn);
	}

	//解除事件函数绑定
	function unBind(key, fn){
		var fns = _evtFns[key];
		if(!fns) return;
		if(!fn){
			fns && (fns.length=0);
		}else{
			for(var i=0,_fn; _fn=fns[i++];){
				if(_fn===fn) fns.splice(i,1);
			}
		}
	}

	//实现请求消息
	function impl(key,fn){
		if(!fn instanceof Function){
			console.log("fn is not a Function.");
		}
		_fnImpl[key] = fn;
	}

	return {
		trigger	: trigger,
		request : request,
		bind 	: bind,
		unBind 	: unBind,
		impl 	: impl
	}
});