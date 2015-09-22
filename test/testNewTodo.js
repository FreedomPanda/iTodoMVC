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

require(['jquery','msgHub','newTodo','sTodo'], function($,msgHub,newTodo,sTodo){
	var anchor = $('#header');
	newTodo.render(anchor);

	_sTodo = sTodo;
});