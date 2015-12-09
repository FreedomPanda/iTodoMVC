'use strict';

define(['jquery','base','sTodo','listTodo','todoItem','sortTodo'],
	function($,base,sTodo,listTodo,todoItem,sortTodo){

	/** ------ 请求消息的实现 ------ **/
	base.impl("addTodo", sTodo.add);
	base.impl("getTodosCount", sTodo.getAllCount);
	base.impl("listTodosByCompleted", sTodo.list);
	base.impl("appendTodo", todoItem.render);
	base.impl("deleteTodo", sTodo.remove);
	base.impl("getAllTodos", sTodo.getDB);
	base.impl("getCompletedCount", sTodo.getCompletedCount);
	base.impl("getRemainingCount", sTodo.getRemainingCount);
	base.impl("clearCompleted", sTodo.clearCompleted);
	base.impl( 'toggleCompleted', function(id,completed){
		return sTodo.update({id:id,completed:completed});
	});
	base.impl( 'updateTodoTitle', function(id,title){
		return sTodo.update({id:id,title:title});
	});

	/** ------------------------- 触发消息的绑定 ------------------------- **/
	//NewTodo组件的消息：
	base.bind('NewTodo_addTodo', [
		listTodo.loadData
	]);
	//ListTodo组件的消息：
	base.bind('ListTodo_load', [
		sortTodo.refresh
	]);
	//TodoItem组件的消息：
	base.bind('TodoItem_removeTodo',[
		listTodo.loadData
	]);
	base.bind('TodoItem_toggleCompleted',[
		listTodo.loadData
	]);
	//SortTodo组件的消息：
	base.bind('SortTodo_onFilter', [
		listTodo.listTodos
	]);
	base.bind('SortTodo_clearCompleted', [
		listTodo.loadData
	]);
});