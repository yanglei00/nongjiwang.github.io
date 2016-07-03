var tplLogin = require('../templates/login.string');
SPA.defineView('login',{
  html: tplLogin,
  // 引入插件
  plugins: ['delegated'],

  bindActions: {
    // 点击跳转到首页
    'goto.index': function (){
      SPA.open('index');
    },
    'goto.register': function (){
      SPA.open('register');
    }
  }

});
