module.exports.isIos={
  isMobile:function (that){
    var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        isAndroid = ua.match(/(Android)\s+([\d.]+)/),
        isMobile = isIphone || isAndroid;
    if(isAndroid) {
      that.isAndroid=true;
      that.isIos=false;
        return ;
    }else if(isIphone){
      that.isAndroid=false;
      that.isIos=true;
      return ;
    }else if(ipad){
      that.isAndroid=false;
      that.isIos=true;
      return
    }
  }
}
