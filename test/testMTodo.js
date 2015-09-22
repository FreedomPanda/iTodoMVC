'use strict';

require.config({
	baseUrl : '../comps',
	paths	: {
		jquery 	: '../utils/jquery-1.9.1.min',
		base 	: '../utils/base',
		storage	: '../utils/storage',
		sTodo	: '../services/sTodo'
	},
});

require(['jquery','sTodo'], function($,sTodo){
	sTodo.clean();
	console.log( sTodo.get() );
	var todos = [];
	for(var i=0; i<5; i++){
		todos.push({
			id 		: i+1,
			title 	: 'Todo-'+(i+1),
			completed : false
		})
	}
	//1.测试sTodo.put()函数
	sTodo.put(todos);

	//2.测试sTodo.get()函数
	console.log( sTodo.get() );

	//3.测试sTodo.add()函数
	sTodo.add({title:'Todo-4',completed:false});
	console.log( sTodo.get() );

	//4.测试sTodo.remove()函数
	sTodo.remove(3);
	console.log( sTodo.get() );

	//5.测试sTodo.update()函数
	var editTodo = {id:1,title:'Todo-001',completed:true};
	sTodo.update(editTodo);
	console.log( sTodo.get() );

	//6.测试sTodo.query()函数
	console.log( sTodo.query(2) );

	//7.测试sTodo.getAllCount()函数
	console.log( sTodo.getAllCount() );

	//8.测试sTodo.getRemainingCount()函数
	console.log( sTodo.getRemainingCount() );

	//9.测试sTodo.getCompletedCount()函数
	console.log( sTodo.getCompletedCount() );

	//10.测试sTodo.clearCompleted()函数
	sTodo.clearCompleted();
	console.log( sTodo.get() );

	//11.测试sTodo.clean()函数
	sTodo.clean();
	console.log( sTodo.get() );
});