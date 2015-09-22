define(['jquery','base'],function($,base){
	'use strict';

	function NewTodo(){
		this.file = 'newTodo.js';
		this.anchor = null;
		this.newInpt = null;
	}

	NewTodo.prototype.tpls = {
		comp :  "<form id='todo-form'>"+
					"<input id='new-todo' placeholder='What needs to be done?' autofocus>"+
				"</form>"
	};

	//组件的渲染函数
	NewTodo.prototype.render = function(anchor){
		var self = this;
		self.anchor = anchor;
		self.anchor.html(self.tpls.comp, self.file);

		//实例DOM对象:
		self.newInpt = self.anchor.find('#new-todo');

		//绑定事件函数：
		self.anchor.find('#todo-form').submit(self.addTodo.bind(self));
	};

	//添加newTodo
	NewTodo.prototype.addTodo = function(event){
		event.preventDefault();
		var self = this;
		var title = self.newInpt.val().trim();
		if(title!=''){
			var newTodo = {
				title : title,
				completed : false
			};
			if( -1!=base.request('addTodo',newTodo) ){
				//成功添加后发布消息
				base.trigger('NewTodo_addTodo',newTodo);
				//清空newTodo的文本输入框
				self.newInpt.val('');
			}else{
				//添加失败
				console.log('Error of adding new todo.');
				base.trigger('NewTodo_addTodo_Failed',newTodo);
			}
		}
	};

	return new NewTodo();
});