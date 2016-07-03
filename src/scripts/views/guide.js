var tplGuide = require('../templates/guide');
SPA.defineView('guide',{
  html: tplGuide,

//swiper的轮播图效果
  // bindEvents: {
  //   'show': function () {
  //     //构建一个swiper对象
  //     var mySwiper = new Swiper('#guide-swiper',{
  //       loop:false,
  //       // 如果需要分页器
  //       pagination: '.swiper-pagination'
  //     });
  //   }
  // }
});
