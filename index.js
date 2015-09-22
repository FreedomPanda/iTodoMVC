require.config({
	baseUrl : './comps',
	paths : {
		jquery 	: '../utils/jquery-1.9.1.min',
		base 	: '../utils/base',
		storage	: '../utils/storage',
		sTodo	: '../services/sTodo'
	},
});

require(['jquery','msgHub','todoApp'],function($,msgHub,todoApp){
	todoApp.render( $('#app') );
});