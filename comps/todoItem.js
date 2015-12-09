'use strict';

define(['jquery','base'], function($,base){

	var _opt = {
		file : "todoItem.js"
	};

	var _dom = {
		slot : null
	};

	var _htm = {
		main : 
			"<li class='todoLi' id='@id'>"+
	        	"<div class='view'>"+
	        		"<input class='toggle' type='checkbox'>"+
	        		"<label class='todoTitle'>@title</label>"+
	        		"<button class='destroy'></button>"+
	        	"</div>"+
	        	"<form><input class='edit'></form>"+
	        "</li>"
	};

	//组件渲染函数
	function render(slot, todo){
		if(!slot || !todo) return; //校验参数

		_dom.slot = slot;

		var todoLi = $( _htm.main
			.replace('@id',todo.id)
			.replace('@title',todo.title) );

		if(todo.completed){
			todoLi.addClass('completed');
			todoLi.find('input[type=checkbox]')[0].checked = 'checked';
		}

		//绑定事件函数
		todoLi.find('.destroy').click(function(){
			removeTodo(todoLi);
		});
		todoLi.find('.toggle').click(function(){
			toggleCompleted( todoLi, $(this) );
		});
		todoLi.find('.todoTitle').dblclick(function(){
			onEditTodo( todoLi );
		});
		
		_dom.slot.prepend(todoLi, self.file);
	};	

	//删除Todo
	function removeTodo(todoLi){
		var ok = base.request( "deleteTodo", todoLi.attr("id") );
		ok ? base.trigger("TodoItem_removeTodo") : console.log("Error of removeTodo.");
	};

	//变更Todo的状态
	function toggleCompleted(todoLi, chk){
		var ok = base.request('toggleCompleted', todoLi.attr('id'), chk[0].checked);
		ok ? base.trigger('TodoItem_toggleCompleted') : console.log('Error of toggleCompleted.');
	};

	//编辑Todo
	function onEditTodo(todoLi){
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

	return {
		render : render
	}
});