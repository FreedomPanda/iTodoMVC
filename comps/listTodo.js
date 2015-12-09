'use strict';
define(['jquery','base'], function($,base){
	
	var _opt = {
		file 	 : "listTodo.js",
		filterKey: "all"
	};

	var _dom = {
		slot   : null,
		chkAll : null
	};

	var _htm = {
		main : 
			"<input id='toggle-all' type='checkbox'>"+
            "<ul id='todo-list'></ul>"
	};

	function render(slot){
		_dom.slot = slot;
		_dom.slot.html(_htm.main, _opt.file);

		//实例DOM对象
		_dom.todosUl = _dom.slot.find("#todo-list");
		_dom.chkAll = _dom.slot.find("#toggle-all");

		//绑定事件函数
		_dom.chkAll.click(function(){
			toggleAll($(this)[0].checked);
		})

		//加载数据
		loadData();
	}

	function loadData(){
		if(!_dom.slot) return;
		base.trigger('ListTodo_load');

		//Todo总数不为0时，隐藏本组件，否则显示该组件。
		var todosCount = base.request("getTodosCount");
		if(0===todosCount){
			_dom.slot.addClass("hidden");
			return;
		}else{
			_dom.slot.removeClass("hidden");
		}
		listTodos(_opt.filterKey);
		updateChkAllBtn();
	}

	function listTodos(filterKey){
		var completed;
		switch(filterKey){
			case 'all':
				_opt.filterKey = 'all';
				break;
			case 'active':
				_opt.filterKey = 'active';
				completed = false;
				break;
			case 'completed':
				_opt.filterKey = 'completed';
				completed = true;
				break;
			default:
				_opt.filterKey = 'all';
				break;
		}
		_dom.todosUl.html('');
		var todos = base.request("listTodosByCompleted",completed) || [];
		for(var i=0, todo; todo=todos[i]; i++){
			base.request("appendTodo", _dom.todosUl, todo);
		}
	}

	function toggleAll(completed){
		var todos = base.request("getAllTodos");
		$(todos).each(function(i,todo){
			var ok = base.request("toggleCompleted", todo.id, completed);
			ok ? loadData() : console.log("Error of toggleCompleted.");
		});
		loadData();
	}

	function updateChkAllBtn(){
		if(undefined === _dom.chkAll[0])
			return;
		if( base.request('getCompletedCount')>0 && base.request('getRemainingCount')==0 ){
			_dom.chkAll[0].checked = true;
		}else{
			_dom.chkAll[0].checked = false;
		}
	}

	return {
		render : render,
		loadData: loadData,
		listTodos: listTodos
	}
});