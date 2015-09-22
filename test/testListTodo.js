'use strict';

var _sTodo; //测试用

require.config({
	baseUrl : '../comps',
	paths	: {
		jquery 	: '../utils/jquery-1.9.1.min',
		base 	: '../utils/base',
		storage	: '../utils/storage',
		sTodo	: '../services/sTodo'
	},
});

require(['jquery','msgHub','listTodo','sTodo'], function($,msgHub,listTodo,sTodo){
	_sTodo = sTodo;

	sTodo.clean();
	for(var i=1; i<=3; i++){
		sTodo.add({
			title : 'Todo-'+i,
			completed : false 
		})
	}
	console.log( sTodo.get() );

	var anchor = $('#main');
	listTodo.render(anchor);
	
});