var tplRegister = require('../templates/register');
SPA.defineView('register',{
  html: tplRegister,

  //引入插件
  plugins: ['delegated'],

  bindActions: {
    'back': function(e,data){
      this.hide()
    }
  }
});
