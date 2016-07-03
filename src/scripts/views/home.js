var tplHome = require('../templates/home');
SPA.defineView('home',{
  html:tplHome,
  //引入插件
  plugins: ['delegated',{
    //引入avalon 插件
    name: 'avalon',
    options: function (vm){
      vm.livelist = [];
      vm.activepic = '';
      vm.crowdpic = '';
      vm.nhczpic = '';
      vm.fl = [];
      vm.zz = [];
      vm.nj = [];

    }
  }],

  // 定义全局变量
  init: {
    vm: null,
    //定义一个将一维数组转化为二维数组的方法
    formatData: function (arr){
      var tempArr = [];
      for(var i = 0; i< Math.ceil(arr.length/3); i++){
        //定义好一个空的二维数组
        tempArr[i] = [];
        tempArr[i].push(arr[3*i]);
        tempArr[i].push(arr[3*i + 1]);
        tempArr[i].push(arr[3*i + 2]);
      }
      return tempArr;
    }
  },


  bindActions: {
    // 跳转到list1页面
    'goto.list1': function (){
      SPA.open('list1');
    },
    // 跳转到details1页面
    'goto.details1': function(e,data){
      //在新打开details1的时候  将绑定在标签上的ms-attr-data-id属性的值传入 details1的子视图中
      SPA.open('details1',{
        param:{
          data: data
        }
      });
    }
  },

  bindEvents: {

    'beforeShow': function(){
      var that = this;
      //获取到定义的vm属性
      that.vm = that.getVM();
      // 加载初始的数据
      $.ajax({
        // url: '/api/getLivelist.php',          //这里是用mock数据来映射出的请求地址
        url: '/nongjiwang/mock/livelist.json',       //这是本地的ajax请求的地址
        type: 'get',
        // data: {
        //   rtype: 'origin'
        // },
        success: function (rs){
          // 将初始的ajas请求来的数据赋值给定义好的vm 的livelist属性
              //并且用formatData()的方法将一维数组转化为二维数组
          that.vm.livelist = that.formatData(rs.mes.ny);
          that.vm.fl = that.formatData(rs.mes.fl);
          that.vm.zz = that.formatData(rs.mes.zz);
          that.vm.nj = that.formatData(rs.mes.nj);
          that.vm.activepic = rs.mes.activepic;
          that.vm.crowdpic = rs.mes.crowdpic;
          that.vm.nhczpic = rs.mes.nhczpic;
          //swiper的代码一定要放在
          //banner的swiper
          var mySwiper = new Swiper ('#home-swiper', {
          //  direction: 'vertical',
          autoplay: true,
          speed: 2000,
          autoplayDisableOnInteraction: false,
           loop: true,
           // 如果需要分页器
           pagination: '.swiper-pagination',
         })
          //banner的swiper结束
        }
      });
    },
		'show': function(){
      var that = this;
			//实现导航条的随向上滑动的距离的增大 颜色逐渐加深的效果
        //获得自定义的滚动区域的data-scroll-id的属性值
      var hScroll = this.widgets.hScroll;
      hScroll.on('scroll',function(){
        if(this.y >= -44){
          $('#index-nav').css('background','rgba(0,255,0,0.0)');
          return;
        };
        if(this.y >= -160){
          $('#index-nav').css('background','rgba(0,255,0,0.2)');
          return;
        };
        if(this.y >= -260){
          $('#index-nav').css('background','rgba(0,255,0,0.4)');
          return;
        };
        if(this.y >= -350){
          $('#index-nav').css('background','rgba(0,255,0,0.6)');
          return;
        };

      });
      // 下拉刷新开始
      var scrollSize = 30;
      // 定义初始的向上的移动的距离
      hScroll.scrollBy(0, -scrollSize);
      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
      hScroll.on('scroll', function () {
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

      hScroll.on('scrollEnd', function () {
          if (this.y >= -100 && this.y < 0) {
              hScroll.scrollTo(0, -100);
              head.removeClass('up');
          } else if (this.y >= 0) {
              head.attr('src', '/nongjiwang/images/ajax-loader.gif');
              // ajax下拉刷新数据
              $.ajax({
                // url: '/api/getLivelist.php',
                url: '/nongjiwang/mock/livelist-refresh.json',
                type: 'get',
                // data: {
                //   rtype: 'refresh'
                // },
                success: function (rs){
                  setTimeout(function () {
                      that.vm.livelist = that.formatData(rs.data);
                      hScroll.scrollTo(0, -scrollSize);
                      head.removeClass('up');
                      head.attr('src', '/nongjiwang/images/arrow.png');
                  }, 1000);
                }
              })
          }
      })
      // 下拉刷新结束
		}

	}
});
