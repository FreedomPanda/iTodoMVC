"use strict";

define(['jquery','storage'],function($,storage){

	var _opt = {
		STORAGE_ID : "TODO",
		currID : getCurrID()
	}

	function getDB(){
		return storage.get("TODO");
	}

	function putDB(todos){
		storage.put(_opt.STORAGE_ID, todos);
		return true;
	}

	function cleanDB(){
		storage.clean(_opt.STORAGE_ID);
		return true;
	}

	//获得Todo自增ID的当前值
	function getCurrID(){
		var arr = getDB();
		return arr.length>0 ? arr[arr.length-1].id : 0;
	}

	//增
	function add(todo){
		var todos = getDB();
		todo.id = ++_opt.currID;
		todos.push(todo);
		putDB(todos);
		return _opt.currID;
	}

	//删
	function remove(id){
		var todos = getDB();
		todos.splice(indexByTodoID(id),1);
		return putDB(todos);
	}

	//改
	function update(todo){
		var todos = getDB();
		for(var i=todos.length-1; i>=0; i--){
			if(todo.id==todos[i].id){
				for(var p in todo){
					todos[i][p] = todo[p];
				}
				break;
			}
		}
		return putDB(todos);
	}

	//查（单个）
	function query(id){
		var todos = getDB();
		for(var i=todos.length-1; i>=0; i--){
			if(todos[i].id == id){
				return todos[i];
			}
		}
	}

	//查（遍历）
	function list(completed){
		var todos = getDB();
		if(undefined===completed){
			return todos;
		}else{
			var rsTodos = [];
			$(todos).each(function(i,todo){
				if(completed === todo.completed)
					rsTodos.push(todo);
			});
			return rsTodos;
		}
	}

	//获取Todo总数量
	function getAllCount(){
		return getDB().length;
	}

	function getRemainingCount(){
		var todos = getDB();
		var remainingCount = 0;
		$(todos).each(function(i){
			if(false===todos[i].completed){
				remainingCount++;
			}
		});
		return remainingCount;
	}

	//获取已完成的Todo数量
	function getCompletedCount(){
		return getAllCount() - getRemainingCount();
	}

	//清除已完成的Todo
	function clearCompleted(){
		var todos = getDB();
		var newTodos = [];
		$(todos).each(function(i,todo){
			if(false===todo.completed){
				newTodos.push(todo);
			}
		});
		return putDB(newTodos);
	}

	//根据Todo的id获取Todo在List中的索引
	function indexByTodoID(todoID){
		var todos = getDB();
		for(var i=0,todo; todo=todos[i];i++){
			if(todoID == todo.id){
				return i;
			}
		}
	}

	return {
		getDB : getDB,
		add : add,
		remove : remove,
		update : update,
		list : list,
		getAllCount : getAllCount,
		getCompletedCount: getCompletedCount,
		getRemainingCount: getRemainingCount,
		clearCompleted: clearCompleted
	}
});