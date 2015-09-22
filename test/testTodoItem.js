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

require(['jquery','msgHub','sTodo','todoItem'], function($,msgHub,sTodo,todoItem){
	var anchor = $('#todo-list');
	var todo = sTodo.get()[0];
	todoItem.render(anchor,todo);
	
	_sTodo = sTodo;
});