'use strict';

define(['jquery','base'],function($,base){

	var _opt = {
		file : "newTodo.js"
	};

	var _dom = {
		slot	: null,
		newInpt : null,
		todoForm: null
	};

	var _htm = {
		main : 
			"<form id='todo-form'>"+
				"<input id='new-todo' placeholder='What needs to be done?' autofocus>"+
			"</form>"
	};

	function render(slot){
		_dom.slot = slot;
		//渲染本组件的View
		_dom.slot.html(_htm.main, _opt.file);

		//Dom对象实例化
		_dom.newInpt = _dom.slot.find("#new-todo");
		_dom.todoForm = _dom.slot.find("#todo-form");

		//绑定事件函数
		_dom.todoForm.submit(addTodo);
	}

	function addTodo(evt){
		evt.preventDefault();
		var title = _dom.newInpt.val().trim();
		if(title!=""){
			var newTodo = {
				title 	 : title,
				completed: false
			};
			if(	-1 != base.request("addTodo", newTodo) ){
				//成功添加后发布消息
				base.trigger('NewTodo_addTodo',newTodo);
				//清空newTodo的文本输入框
				_dom.newInpt.val('');
			}else{
				//添加失败
				console.log('Error of adding new todo.');
				base.trigger('NewTodo_addTodo_Failed',newTodo);
			}
		}
	}
	
	return {
		render : render
	}
});