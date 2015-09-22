'use strict';
define(['jquery','base'], function($,base){
	
	function ListTodo(){
		this.file 		= 'listTodo.js';
		this.filterKey 	= 'all',
		this.anchor 	= null;
		this.todosUl 	= null;
		this.chkAll 	= null;
	}

	ListTodo.prototype.tpls = {
		comp :  "<input id='toggle-all' type='checkbox'>"+
            	"<ul id='todo-list'></ul>"
	};

	//组件的渲染函数
	ListTodo.prototype.render = function(anchor){
		var self = this;
		self.anchor = anchor;
		// base.html(self.anchor, self.tpls.comp, self.file);
		self.anchor.html(self.tpls.comp, self.file);

		//实例DOM对象
		self.todosUl = self.anchor.find('#todo-list');

		//绑定事件函数
		self.chkAll = self.anchor.find('#toggle-all');
		self.chkAll.click(function(){
			self.toggleAll( $(this)[0].checked );
		});

		//加载数据
		self.load();
	};

	//加载数据函数
	ListTodo.prototype.load = function(){
		var self = this;

		if(!self.anchor) return;

		base.trigger('ListTodo_load');//发布'ListTodo_load'消息

		//Todo总数不为0时，隐藏本组件，否则显示该组件。
		var todosCount = base.request('getTodosCount');
		if(todosCount===0){
			self.anchor.addClass('hidden');
			return;
		}else{
			self.anchor.removeClass('hidden');
		}
		self.listTodos(self.filterKey);//遍历todos队列
		self.updateChkAllBtn();//根据todos的完成状态更新toggle-all按钮
	};

	//加载todos队列
	ListTodo.prototype.listTodos = function(filterKey){
		var self = this;
		var completed;
		switch(filterKey){
			case 'all':
				self.filterKey = 'all';
				break;
			case 'active':
				self.filterKey = 'active';
				completed = false;
				break;
			case 'completed':
				self.filterKey = 'completed';
				completed = true;
				break;
			default:
				self.filterKey = 'all';
				break;
		}
		self.todosUl.html('');
		//请求todos(by completed)
		var todos = base.request('listTodosByCompleted',completed) || [];
		for(var i=0,todo; todo=todos[i]; i++){
			base.request('appendTodo', self.todosUl, todo);
		}
	};

	//变更所有Todo的状态
	ListTodo.prototype.toggleAll = function(completed){
		var self = this;
		var todos = base.request('getAllTodos');
		$(todos).each(function(i,todo){
			var ok = base.request('toggleCompleted',todo.id,completed);
			ok ? self.load() : console.log('Error of toggleCompleted.');
		});
		self.load();
	};

	//更新ChkAllBtn的状态
	ListTodo.prototype.updateChkAllBtn = function(){
		var self = this;
		if(undefined === self.chkAll[0])
			return;
		if( base.request('getCompletedCount')>0 && base.request('getRemainingCount')==0 ){
			self.chkAll[0].checked = true;
		}else{
			self.chkAll[0].checked = false;
		}
	};
	
	return new ListTodo();
});