<template>
    <div id="app">
      <div class="main-box">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
      </div>
    </div>
</template>

<script>
import FastClick from './dependjs/fastclick.js'
export default {
  data(){
    return {
      screenHeight:document.documentElement.clientHeight
    }
  },
  mounted(){
    document.body.style.height=this.screenHeight+'px';
    // 解决ios300毫秒延迟
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
      }, false);
    };
    // 检测屏幕
    (function(doc,win){
    var docEl = doc.documentElement,resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function(){
      var clientWidth = docEl.clientWidth;
      if(!clientWidth) return;
      // if(clientWidth>=750){
      //   docEl.style.fontSize = '100px';
      // }else{
      //   docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      // }
      if(clientWidth>=750){
        docEl.style.fontSize = '50px';
      }else{
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
      }
    };
    if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document,window);
  },
  methods:{

  },
  components:{

  }
}

</script>
<style lang='scss'>
$base:#2d74ff;
.footer_icon{
  .end_btn{
    background: #fff;
  }
}
.clear{
  clear:both
}
.main-box{
  height:100%;
}





</style>
