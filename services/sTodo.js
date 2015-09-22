define(['jquery','storage'],function($,storage){
	'use strict';

	/*
	todo的字面量格式：
	todo : {
		id : 0,
		title : '',
		completed : false
	}
	*/
	function STodo(){
		this.STORAGE_ID = 'TODO';
		this.currID = this.getCurrID();//取得Todo自增ID的当前值
	}

	STodo.prototype.get = function(){
		return storage.get(this.STORAGE_ID);
	};

	STodo.prototype.put = function(todos){
		storage.put(this.STORAGE_ID,todos);
		return true;
	};

	STodo.prototype.clean = function(){
		storage.clean(this.STORAGE_ID);
		return true;
	};

	//增
	STodo.prototype.add = function(todo){
		var self  = this,
			todos = self.get();
		todo.id = ++self.currID;
		todos.push(todo);
		self.put(todos);
		return self.currID;
	};

	//删
	STodo.prototype.remove = function(id){
		var self = this;
		var todos = self.get();
		todos.splice(self.indexByTodoID(id),1);
		return self.put(todos);
	};

	//改
	STodo.prototype.update = function(todo){
		var self = this;
		var todos = self.get();
		for(var i=todos.length-1; i>=0; i--){
			if(todo.id==todos[i].id){
				for(var p in todo){
					todos[i][p] = todo[p];
				}
				break;
			}
		}
		return self.put(todos);
	};

	//查（单个）
	STodo.prototype.query = function(id){
		var self = this;
		var todos = self.get();
		for(var i=todos.length-1; i>=0; i--){
			if(todos[i].id == id){
				return todos[i];
			}
		}
	};

	//查（遍历）
	STodo.prototype.list = function(completed){
		var self = this;
		var todos = self.get();
		if(completed===undefined){
			return todos;
		}else{
			var rsTodos = [];
			$(todos).each(function(i,todo){
				if(completed === todo.completed)
					rsTodos.push(todo);
			});
			return rsTodos;
		}
	};

	//获取Todo总数量
	STodo.prototype.getAllCount = function(){
		var self = this;
		return self.get().length;
	};

	//获取未完成的Todo数量
	STodo.prototype.getRemainingCount = function(){
		var self = this;
		var todos = self.get();
		var remainingCount = 0;
		$(todos).each(function(i){
			if(false === todos[i].completed){
				remainingCount++;
			}
		});
		return remainingCount;
	};

	//获取已完成的Todo数量
	STodo.prototype.getCompletedCount = function(){
		var self = this;
		return self.getAllCount() - self.getRemainingCount();
	};

	//清除已完成的Todo
	STodo.prototype.clearCompleted = function(){
		var self = this;
		var todos = self.get();
		var newTodos = [];
		$(todos).each(function(i,todo){
			if(false === todo.completed){
				newTodos.push(todo);
			}
		});
		return self.put(newTodos);
	};

	//根据Todo的id获取Todo在List中的索引
	STodo.prototype.indexByTodoID = function(todoID){
		var self = this;
		var todos = self.get();
		for(var i=0,todo; todo=todos[i]; i++){
			if(todoID == todo.id){
				return i;
				break;
			}
		}
	};

	// 获取Todo自增ID的当前值
	STodo.prototype.getCurrID = function(){
		var self = this;
		var arr = self.get();
		return arr.length>0 ? arr[arr.length-1].id : 0;
	};

	return new STodo();
});