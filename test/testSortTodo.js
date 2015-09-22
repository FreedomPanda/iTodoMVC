'use strict';

var _sTodo; //测试用

require.config({
	baseUrl : '../comps',
	paths 	: {
		jquery 	: '../utils/jquery-1.9.1.min',
		base 	: '../utils/base',
		storage	: '../utils/storage',
		sTodo	: '../services/sTodo'
	},
});

require(['jquery','msgHub','sTodo','sortTodo'], function($,msgHub,sTodo,sortTodo){	
	_sTodo = sTodo;
	sTodo.clean();
	for(var i=1; i<=3; i++){
		sTodo.add({
			title : 'Todo-'+i,
			completed : i%2==0 ? true : false 
		})
	}
	console.log(sTodo.get());

	var anchor = $('#footer');
	sortTodo.render(anchor);
});