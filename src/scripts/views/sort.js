var tplSort = require('../templates/sort');
SPA.defineView('sort',{
  html: tplSort

  //引入插件
	// plugins: ['delegated'],
	//引入子视图
	// modules: [{
	// 	name: 'content',
	// 	views: ['sort1','sort2'],
	// 	defaultTag: 'sort1',
	// 	container: '.sort-details'
	// }],
	//实现点击底导航进行tab切换
	// bindActions: {
		// 'switch.tabs': function(e, data){
			//实现子视图切换时的高亮显示
			// util.setFoucs(e.el);
			//实现子视图的切换
			// this.modules.content.launch(data.tag);
		// }
		// //实现子视图的跳转
		// 'goto.sort': function(e,data){
		// 	//导航高亮
		// 	util.setFoucs(e.el);
		// 	//打开新的页面
		// 	SPA.open('sort');
		// },
		// 'goto.cart': function(e,data){
		// 	util.setFoucs(e.el);
		// 	SPA.open('cart')
		// }

	// }
});
