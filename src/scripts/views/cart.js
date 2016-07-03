var tplCart = require('../templates/cart');
SPA.defineView('cart',{
  html: tplCart,
  //引入插件
  plugins: ['delegated'],

  bindActions: {
    //点击左上角返回首页
    'back': function (e,data){
      this.hide();
    },
    'goto.list1': function (e,data){
      SPA.open('list1');
    }
  }
});
