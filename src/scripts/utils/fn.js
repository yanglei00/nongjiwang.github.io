// 自定义的公共函数
var Util = {
  "setFoucs" : function (e){
    $(e).addClass('active').siblings().removeClass('active');
  }
};
// 暴露
module.exports = Util;
