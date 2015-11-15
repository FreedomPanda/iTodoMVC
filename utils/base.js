define(['jquery'],function($){	

	'use strict';
	
	function Base(){
		this.cfg = {
			debug : true
		};
		//存储事件与函数的映射关系
		this.evtFns = {};
		//存储事件与实现函数的映射关系
		this.fnImpl = {};

		var sNote = "<!-- >>>>>>>>>>>>>>>>>>>>>>> @note >>>>>>>>>>>>>>>>>>>>>>> -->",
			eNote = "<!-- <<<<<<<<<<<<<<<<<<<<<<< @note <<<<<<<<<<<<<<<<<<<<<<< -->";

		this.myHtml = function(oriFn){
			return function(){
				var th = this; //这里的this指的是调用者
				oriFn.apply(th, arguments);
				if(arguments[1]!==undefined){
					var file = arguments[1];
					$(th).before(sNote.replace('@note',file));
					$(th).after(eNote.replace('@note',file));
				}
			}
		}($.prototype.html);

		this.myPrepend = function(oriFn){
			return function(){
				var th = this; //这里的this指的是调用者
				oriFn.apply(th,arguments[0]);
				if(arguments[1]!==undefined){
					var file = arguments[1];
					$(arguments[0]).before(sNote.replace('@note',file));
					$(arguments[0]).after(eNote.replace('@note',file));
				}
			}
		}($.prototype.prepend);

		//覆写jquery的方法
		if(this.cfg.debug){
			$.prototype.html = this.myHtml;
			$.prototype.prepend = this.myPrepend;
		}

		//绑定事件函数（多个）
		this.bind = function(key, fns){
			var self = this;
			if(fns instanceof Array){
				for(var i in fns){
					self.doBind(key,fns[i]);
				}
			}else{
				self.doBind(key,fns);
			}
		};

		//绑定事件函数
		this.doBind = function(key,fn){
			if(!(fn instanceof Function))
				return;
			var self = this;
			if( !self.evtFns[key] ){
				self.evtFns[key] = [];
			}
			self.evtFns[key].push(fn);
		};

		//解除事件函数绑定
		this.unBind = function(key,fn){
			var self = this;
			var fns = self.evtFns[key];
			if(!fns){
				return false;
			}
			if(!fn){
				fns && (fns.length=0);
			}else{
				for(var i=0,_fn; _fn=fns[i++];){
					if(_fn===fn){
						fns.splice(i,1);
					}
				}
			}
		};

		//消息发布
		this.trigger = function(){
			var self = this;
			var key = Array.prototype.shift.call(arguments);
			var fns = self.evtFns[key];
			if(!fns || fns.length===0){
				return false;
			}
			for(var i=0,fn; fn=fns[i++];){
				fn.apply(this,arguments);
			}
		};

		//实现事件函数
		this.impl = function(key,fn){
			if(!(fn instanceof Function)){
				console.log('fn is not a Function.');
				return false;
			}
			var self = this;
			self.fnImpl[key] = fn;
		};

		//请求事件
		this.request = function(){
			var self = this;
			var key = Array.prototype.shift.call(arguments);
			var fn = self.fnImpl[key];
			if(fn instanceof Function){
				return fn.apply(this, arguments);
			}else{
				return false;
			}
		};
	}
	
	return new Base();
	
});