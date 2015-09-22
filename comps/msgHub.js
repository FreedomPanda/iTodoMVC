'use strict';

define(['jquery','base','sTodo','listTodo','todoItem','sortTodo'],
	function($,base,sTodo,listTodo,todoItem,sortTodo){

	function MsgHub(){
		/** --------------------------- 请求消息的实现 --------------------------- **/
		base.impl( 'addTodo', sTodo.add.bind(sTodo) );
		base.impl( 'getAllTodos', sTodo.get.bind(sTodo) );
		base.impl( 'clearCompleted', sTodo.clearCompleted.bind(sTodo) );
		base.impl( 'getTodosCount', sTodo.getAllCount.bind(sTodo) );
		base.impl( 'getRemainingCount', sTodo.getRemainingCount.bind(sTodo) );
		base.impl( 'getCompletedCount', sTodo.getCompletedCount.bind(sTodo) );
		base.impl( 'listTodosByCompleted', sTodo.list.bind(sTodo) );
		base.impl( 'deleteTodo', sTodo.remove.bind(sTodo) );
		base.impl( 'toggleCompleted', function(id,completed){
			return sTodo.update({id:id,completed:completed});
		});
		base.impl( 'updateTodoTitle', function(id,title){
			return sTodo.update({id:id,title:title});
		});
		base.impl( 'appendTodo', todoItem.render.bind(todoItem) );

		/** ------------------------- 触发消息的绑定 ------------------------- **/
		//NewTodo组件的消息：
		base.bind('NewTodo_addTodo', [
			listTodo.load.bind(listTodo)
		]);

		//ListTodo组件的消息：
		base.bind('ListTodo_load', [
			sortTodo.refresh.bind(sortTodo)
		]);

		//TodoItem组件的消息：
		base.bind('TodoItem_removeTodo',[
			listTodo.load.bind(listTodo)
		]);
		base.bind('TodoItem_toggleCompleted',[
			listTodo.load.bind(listTodo)
		]);
		
		//SortTodo组件的消息：
		base.bind('SortTodo_onFilter', [
			listTodo.listTodos.bind(listTodo)
		]);
		base.bind('SortTodo_clearCompleted', [
			listTodo.load.bind(listTodo)
		]);
	}

	return new MsgHub();
});