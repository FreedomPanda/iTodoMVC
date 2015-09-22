'use strict';

define(['jquery','base'], function($,base){

	function TodoItem(){
		this.file 	= 'todoItem.js';
		this.anchor = null;
	}

	TodoItem.prototype.tpls = {
		comp : "<li class='todoLi' id='@id'>"+
		        	"<div class='view'>"+
		        		"<input class='toggle' type='checkbox'>"+
		        		"<label class='todoTitle'>@title</label>"+
		        		"<button class='destroy'></button>"+
		        	"</div>"+
		        	"<form><input class='edit'></form>"+
		        "</li>"
	};

	//组件渲染函数
	TodoItem.prototype.render = function(anchor, todo){
		if(!anchor || !todo) return; //校验参数

		var self = this;
		self.anchor = anchor;

		var todoLi = $( self.tpls.comp
			.replace('@id',todo.id)
			.replace('@title',todo.title) );

		if(todo.completed){
			todoLi.addClass('completed');
			todoLi.find('input[type=checkbox]')[0].checked = 'checked';
		}

		//绑定事件函数
		todoLi.find('.destroy').click(function(){
			self.removeTodo(todoLi);
		});
		todoLi.find('.toggle').click(function(){
			self.toggleCompleted( todoLi, $(this) );
		});
		todoLi.find('.todoTitle').dblclick(function(){
			self.onEditTodo( todoLi );
		});
		
		self.anchor.prepend(todoLi, self.file);
	};	

	//删除Todo
	TodoItem.prototype.removeTodo = function(todoLi){
		var self = this;
		var ok = base.request( 'deleteTodo', todoLi.attr('id') );
		ok ? base.trigger('TodoItem_removeTodo') : console.log('Error of removeTodo.');
	};

	//变更Todo的状态
	TodoItem.prototype.toggleCompleted = function(todoLi, chk){
		var self = this;
		var ok = base.request('toggleCompleted', todoLi.attr('id'), chk[0].checked);
		ok ? base.trigger('TodoItem_toggleCompleted') : console.log('Error of toggleCompleted.');
	};

	//编辑Todo
	TodoItem.prototype.onEditTodo = function(todoLi){
		var self = this;
		todoLi.addClass('editing');
		var title = todoLi.find('.todoTitle').text();
		var editInpt = todoLi.find('input[class=edit]');
		editInpt.blur(function(){
			var title = editInpt.val();
			var ok = base.request('updateTodoTitle',todoLi.attr('id'),title);
			if(ok){
				todoLi.removeClass('editing');
				todoLi.find('.todoTitle').text(title);
			}else{
				console.log('Error of onEditTodo.');
			}
		});
		editInpt.val(title).focus();
	};

	return new TodoItem(); 
});