define(['jquery','base','sTodo','newTodo','listTodo','sortTodo'], 
	function($,base,sTodo,newTodo,listTodo,sortTodo){
	
	'use strict';
	
	function TodoApp(){
		this.file = "todoApp.js"
		this.anchor = null;
	}

	TodoApp.prototype.tpls = {
		comp : 	"<section id='todoapp'>"+
					"<h1>todos</h1>"+
					"<header id='header'></header>"+
		            "<section id='main'></section>"+
		            "<footer id='footer'></footer>"+
	        	"</section>",
	};

	//组件的渲染函数
	TodoApp.prototype.render = function(anchor){
		var self = this;
		self.anchor = anchor;
		self.anchor.html(self.tpls.comp,self.file);
		newTodo.render( self.anchor.find('#header') );
		listTodo.render( self.anchor.find('#main') );
		sortTodo.render( self.anchor.find('#footer') );
	};

	return new TodoApp();
});