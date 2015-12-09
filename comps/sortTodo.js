"use strict";

define(['jquery','base'], function($,base){

	var _opt = {
		file : "sortTodo.js"
	};

	var _dom = {
		slot : null,
		remainingCount: null,
		completedCount: null
	};

	var _htm = {
		main : 
			"<span id='todo-count'><strong id='remainingCount'>0</strong> items left</span>"+
        	"<ul id='filters'>"+
        		"<li><a href='javascript:void(0)' value='all' class='selected'>All</a></li>"+
        		"<li><a href='javascript:void(0)' value='active'>Active</a></li>"+
        		"<li><a href='javascript:void(0)' value='completed'>Completed</a></li>"+
        	"</ul>"+
        	"<button id='clear-completed'>Clear completed (<span id='completedCount'>0</span>)</button>"
	};

	function render(slot){
		_dom.slot = slot;
		_dom.slot.html(_htm.main, _opt.file);

		//实例DOM对象
		_dom.remainingCount = _dom.slot.find('#remainingCount');
		_dom.completedCount = _dom.slot.find('#completedCount');

		//绑定事件函数
		var filters = _dom.slot.find('#filters');
		filters.find('a').click(function(){
			onFilter($(this));
		});
		var clearBtn = _dom.slot.find('#clear-completed');
		clearBtn.click( clearCompleted );
		
		//刷新组件状态
		refresh();
	};

	//组件状态刷新函数
	function refresh(){
		if(null===_dom.slot) return;
		//Todo总数不为0时，隐藏本组件，否则显示该组件。
		var todosCount = base.request('getTodosCount');
		if(0===todosCount){
			_dom.slot.addClass('hidden');
			return;
		}else{
			_dom.slot.removeClass('hidden');
		}

		var remainingCount = base.request('getRemainingCount');
		_dom.remainingCount.text(remainingCount);

		//完成的Todo数量大于0时显示'clear-completed'按钮，否则隐藏。
		var completedCount = base.request('getCompletedCount');
		if(completedCount>0){
			_dom.completedCount.parent().removeClass('hidden');
			_dom.completedCount.text(completedCount);
		}else{
			_dom.completedCount.parent().addClass('hidden');
		}
	};

	function onFilter(filterBtn){
		var filterKey = filterBtn.attr('value');
		filterBtn.closest('#filters').find('a').removeClass('selected');
		filterBtn.addClass('selected');
		base.trigger('SortTodo_onFilter',filterKey);
	}

	function clearCompleted(){
		var ok = base.request('clearCompleted');
		ok ? base.trigger('SortTodo_clearCompleted') : console.log('Error of clearCompleted.');
	};

	return {
		render : render,
		refresh : refresh
	}
});