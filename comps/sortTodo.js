define(['jquery','base'], function($,base){

	'use strict';

	function SortTodo(){
		this.file = 'sortTodo.js';
		this.anchor = null;
		this.remainingCount = null;
		this.completedCount = null;
	}

	SortTodo.prototype.tpls = {
		comp :  "<span id='todo-count'><strong id='remainingCount'>0</strong> items left</span>"+
            	"<ul id='filters'>"+
            		"<li><a href='javascript:void(0)' value='all' class='selected'>All</a></li>"+
            		"<li><a href='javascript:void(0)' value='active'>Active</a></li>"+
            		"<li><a href='javascript:void(0)' value='completed'>Completed</a></li>"+
            	"</ul>"+
            	"<button id='clear-completed'>Clear completed (<span id='completedCount'>0</span>)</button>"
	};

	//组件渲染函数
	SortTodo.prototype.render = function(anchor){
		var self = this;
		self.anchor = anchor;
		// base.html(self.anchor, self.tpls.comp, self.file);
		self.anchor.html(self.tpls.comp, self.file);

		//实例DOM对象
		self.remainingCount = self.anchor.find('#remainingCount');
		self.completedCount = self.anchor.find('#completedCount');

		//绑定事件函数
		var filters = self.anchor.find('#filters');
		filters.find('a').click(function(){
			self.onFilter($(this));
		});
		var clearBtn = self.anchor.find('#clear-completed');
		clearBtn.click( self.clearCompleted.bind(self) );
		
		//刷新组件状态
		self.refresh();
	};

	//组件状态刷新函数
	SortTodo.prototype.refresh = function(){
		var self = this;
		if(self.anchor===null) return;
		//Todo总数不为0时，隐藏本组件，否则显示该组件。
		var todosCount = base.request('getTodosCount');
		if(todosCount===0){
			self.anchor.addClass('hidden');
			return;
		}else{
			self.anchor.removeClass('hidden');
		}

		var remainingCount = base.request('getRemainingCount');
		self.remainingCount.text(remainingCount);

		//完成的Todo数量大于0时显示'clear-completed'按钮，否则隐藏。
		var completedCount = base.request('getCompletedCount');
		if(completedCount>0){
			self.completedCount.parent().removeClass('hidden');
			self.completedCount.text(completedCount);
		}else{
			self.completedCount.parent().addClass('hidden');
		}
	};

	//过滤函数
	SortTodo.prototype.onFilter = function(filterBtn){
		var self = this;
		var filterKey = filterBtn.attr('value');
		filterBtn.closest('#filters').find('a').removeClass('selected');
		filterBtn.addClass('selected');
		base.trigger('SortTodo_onFilter',filterKey);
	};

	//清除完成的Todo
	SortTodo.prototype.clearCompleted = function(){
		var self = this;
		var ok = base.request('clearCompleted');
		ok ? base.trigger('SortTodo_clearCompleted') : console.log('Error of clearCompleted.');
	};

	return new SortTodo();
});