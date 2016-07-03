// 引入spa类库
require('./lib/spa.min.js');
// 引入swiper类库
require('./lib/swiper-3.3.1.min.js');





//引入视图
require('./views/guide.js');
require('./views/index.js');
require('./views/home.js');
require('./views/sort.js');
require('./views/cart.js');
require('./views/my.js');
require('./views/list1.js');
require('./views/details1.js');
require('./views/login.js');
require('./views/register.js');
//设置默认的首个视图
SPA.config({
  indexView: 'login'
});
