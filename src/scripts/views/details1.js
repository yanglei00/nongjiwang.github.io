var tplDetails1 = require('../templates/details1');

SPA.defineView('details1',{
  html: tplDetails1,

  //引入插件
  plugins: ['delegated',{
    // 引入avalon 插件
    name: 'avalon',
    options: function(vm){
      vm.imgsrc = '';
      vm.title = '';
      vm.isShowLoading = true;
    }
  }],

  init:{
    vm: null,
  },

  bindActions: {
    'back': function (){
      this.hide();
    }
  },

  bindEvents: {

    'show': function (e,data){
      var that = this;
      that.vm = that.getVM();

      // 接受 home中绑定好并且传入的数据
      var d = this.param.data;
      $.ajax({
        // url: 'api/getLivelist.php',
        url: '/nongjiwang/mock/details1.json',
        type: 'get',
        // data: {
        //   id: d.id
        // },
        success: function (rs){
          setTimeout(function(){
            that.vm.imgsrc = rs.data.imgsrc;
            that.vm.title = rs.data.title;
            that.vm.isShowLoading = false;
          },600);
        }
      });
    }
  }

});
