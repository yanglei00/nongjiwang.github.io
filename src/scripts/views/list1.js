var tplList1 = require('../templates/list1');


//引入公共的函数
var util = require('../utils/fn.js');

SPA.defineView('list1',{
  html: tplList1,
  //引入插件
  plugins: ['delegated',{
    name: 'avalon',
    options: function (vm){
      vm.livelist = [];
    }
  }],

  //定义公共的全局变量
  init: {
    vm: null,
    livelistArray: null
  },

  bindActions: {
    // 实现点击左上角返回
    'back': function(){
      this.hide();
    },

    //实现点击切换
    'switch.tabs': function (e,data){
      util.setFoucs(e.el);
    }

  },

  bindEvents: {
    'beforeShow': function (){
      var that = this;
      that.vm = that.getVM();
      //用ajax来获得到初始的商品列表信息
      $.ajax({
        // url: 'api/getLivelist.php',
        url: '/nongjiwang/mock/livelist-list1-origin',
        type: 'get',
        // data: {
        //   rtype: 'list1-origin'
        // },
        success: function(rs){
          that.vm.livelist = rs.data;
        }
      });
    },
    'show': function(e,data){
      var that = this;
      that.vm = that.getVM();

      // 上来加载更多
      var scrollSize = 30;
      var myScroll = that.widgets.list1Scroll;
      myScroll.scrollBy(0, -scrollSize);

    var head = $('.head img'),
        topImgHasClass = head.hasClass('up');
    var foot = $('.foot img'),
        bottomImgHasClass = head.hasClass('down');
    myScroll.on('scroll', function () {
        var y = this.y,
            maxY = this.maxScrollY - y;
        if (y >= 0) {
            !topImgHasClass && head.addClass('up');
            return '';
        }
        if (maxY >= 0) {
            !bottomImgHasClass && foot.addClass('down');
            return '';
        }
    });

    myScroll.on('scrollEnd', function () {
        if (this.y >= -100 && this.y < 0) {
            myScroll.scrollTo(0, -100);
            head.removeClass('up');
        } else if (this.y >= 0) {
            head.attr('src', '/nongjiwang/images/ajax-loader.gif');
            //ajax下拉刷新数据
            $.ajax({
              // url: 'api/getLivelist.php',
              url: '/nongjiwang/mock/livelist-list1-more.json',
              type: 'get',
              // data: {
              //   rtype: 'list1-more'
              // },
              success: function (rs){
                that.vm.livelist = rs.data.concat(that.vm.livelist);
                myScroll.scrollTo(0, -scrollSize);
                head.removeClass('up');
                head.attr('src', '/nongjiwang/images/arrow.png');
              }
            });
        }

        var maxY = this.maxScrollY - this.y;
        var self = this;
        if (maxY > -100 && maxY < 0) {
            myScroll.scrollTo(0, self.maxScrollY + 100);
            foot.removeClass('down')
        } else if (maxY >= 0) {
            foot.attr('src', '/nongjiwang/images/ajax-loader.gif');
            //TODO ajax上拉加载数据
            $.ajax({
              // url: 'api/getLivelist.php',
              url: '/nongjiwang/mock/livelist-more.json',
              type: 'get',
              // data: {
              //   rtype: 'more'
              // },
              success: function (rs){
                //定义一个数组来拼接 请求来的数据
                that.vm.livelist = that.vm.livelist.concat(rs.data);
                myScroll.scrollTo(0, self.y + 100);
                foot.removeClass('down');
                foot.attr('src', '/nongjiwang/images/arrow.png');
              }
            });

        }
    })


      // 上拉加载更多结束




    }
  }

});
