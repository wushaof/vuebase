<template>
  <div class="homebg">

      <section class='home' v-show='startShow'>
        <img src="../img/xiaohai.png" alt="" />

        <p class='name'>小嗨</p>

        <span class='robot'>智能法律机器人</span>

        <section class='start' @click='start'>开始</section>
      </section>

      <section class='chatroom' v-show='chatShow'>
        <header class='header'>
          <i @click='goBack' class='iconfont icon-fanhui'></i>
          <span>小嗨智能法律机器人</span>
        </header>
        <div id="scroll">

          <div class="child">

            <section :class="[item.msg_type==1?'chatleft':'chatright']" v-for='item in chatList'>
                <img :src="item.user_head">
                <div class="chatwith">
                    <span>{{item.user_name}}</span>
                    <p class="chatcon"><span>{{item.content}}</span></p>
                </div>
            </section>

          </div>

        </div>

        <article id='clickdiv' class="article" @click="openKeyboard">
          <div class="">
            <input type="text" @focus='focus' @blur='blur' class='text'
               v-model='textvalue'>
          </div>
          <span :class="{'btncolor':colorTrue}" @click='emitMes'>发送</span>
        </article>
      </section>

  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default{
    data(){
      return{
        HomeSC:null,
        chatShow:true,
        startShow:false,
        coverShow:false,
        textvalue:'',
        colorTrue:false,
        topTrue:false,
        timer:null,
        chatList:[
          {
            msg_type:1,
            content:'请问你想咨询什么',
            user_head:"http://192.168.1.38:3000/public/images/smart_robert.jpg",
            user_name:'小嗨智能律师'
          },{
            msg_type:2,
            content:'律师，您好',
            user_head:"http://192.168.1.38:3000/public/images/smart_robert.jpg",
            user_name:'王大锤'
          }
        ]  //聊天信息列表
      }
    },
    watch:{
      textvalue(res){
        var len=res.length;
        if(len!=0&&res[0]!=' '){
          this.colorTrue=true;
        }else{
          this.colorTrue=false
        }
      }
    },
    mounted(){
      var HomeScroll = this.Scroll;
			this.Ios.isIos.isMobile(this);
			this.HomeSC = new HomeScroll('#scroll', {
				mouseWheel: true, click: this.isAndroid, tap: this.isIos,
				scrollX: false,
				fadeScrollbars: false
			});
      setTimeout(()=>{
        this.HomeSC.refresh()
      },0);
      this.HomeSC.on('scrollStart', function () {
        var text=document.querySelector('.text');
        if(text){
          text.blur()
        }
      });
      this.changeWindow()
    },
    methods:{
      focus(){
          // text.scrollIntoView(true)
        if(this.isIos){
          this.timer=setInterval(()=>{  //兼容ios
            document.body.scrollTop=document.body.scrollHeight;
          },100);
        }

      },
      blur(){
        clearInterval(this.timer)
      },
      changeWindow(){   //兼容安卓
        var h = document.documentElement.clientHeight;
        var that = this;
        window.onresize = function () {
          if (window.innerHeight != h) {  //先执行
            that.HomeSC.scrollTo(0, -200000);
          }
        }
      },
      emitMes(){  //发送
        if(this.textvalue[0]==' '){
          Toast('抱歉，第一个字符不能为空')
        }
        if(this.textvalue.length==0 || this.textvalue[0]==' '){
          return;
        }
        var text=document.querySelector('.text');
        var msg={

        }
        this.chatList.push({
          msg_type:2,
          content:this.textvalue,
          user_head:"http://192.168.1.38:3000/public/images/smart_robert.jpg",
          user_name:'王大锤'
        });
        this.textvalue='';
        text.focus();
        this.HomeSC.scrollTo(0, -200000);
        setTimeout(() => {
            this.HomeSC.refresh()
          }, 0);
        // that.getMsg(msg);
      },
      getMsg(msg){

      },
      start(){
        this.startShow=false;
        this.chatShow=true;
      },
      goBack(){
        this.startShow=true;
        this.chatShow=false;
      },
      openKeyboard(){

      }
    }
  }
</script>
<style lang='scss'>
@import '../assets/common';
@import '../assets/unit';
@import '../assets/znsc';
.homebg{
  position:absolute;
  left:0;right:0;
  top:0;bottom:0;
  max-width: 600px;
  margin:0 auto;
}

.text{
  box-sizing: border-box;
  width:100%;
  height:.72rem;
  font-size: .32rem;
  z-index: 999
}
.child{
  padding-top:.2rem;
  padding-bottom:1rem
}

.article {
      @extend %flexbox;
      @extend %flex-ali-ce;
      z-index: 99;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1rem;
      padding: .2rem .2rem .2rem;
      box-sizing: border-box;
      margin-bottom: 0 !important;
      background: #f1f1f1;
      div{
        background:#fff;
        width:83%;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        text-indent: .2rem;
        span{
          background:#fff;
          color:#888
        }
      }
      span {
          box-sizing: border-box;
          font-size: .3rem;
          line-height: .72rem;
          height: .72rem;
          background: #DDDDDD;
          color: #ffffff;
          width: 17%;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          text-align: center;
      }
      .btncolor {
        background: #27aff5;
        color:#fff;
      }
  }
.home{
  text-align: center;
  position:absolute;
  height:100vh;
  width:100%;
  img{
    width:1.8rem;
    margin:0 auto;
    margin-top:1rem;
  }
  .name{
    color:#10afff;
    font-weight:bold;
    font-size:.42rem;
    margin-top:.5rem;
    margin-bottom:.5rem;
  }
  .robot{
    color:#28AFF5;
    font-size:.32rem;
  }
  .start{
    margin:0 auto;
    margin-top:3rem;
    height:.6rem;
    line-height: .6rem;
    font-size:.34rem;
    width:3rem;
    background:#28AFF5;
    color:#fff;
    border-radius:5px;
  }
}
.header{
  color:#28AFF5;
  text-align: center;
  height:.88rem;
  line-height: .88rem;
  font-size:.32rem;
  box-sizing: border-box;
  border-bottom:1px solid #eee;
  i{
    position:absolute;
    left:.2rem;
    /*font-weight:bold;*/
    font-size:.4rem;
  }
}
.chatleft {
    section {
        background: $backgroundw
    }
    font-size: .3rem;
    padding: .14rem .18rem .14rem;
    @extend %flexbox;
    @extend %flex-r;
    img {
        width: .8rem;
        height: .8rem;
        margin-top: 0;
    }
    .chatwith {
        max-width:75%;
        margin-top:-.1rem;
        background: #fff;
        > span {
            font-size: .22rem;
            color: #888;
            margin-left: .18rem;
        }
    }
    .chatcon {
        padding: .14rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        background: $backgroundw;
        position: relative;
        margin-left: .2rem;
    }

    .chatcon:before {
        content: '';
        border-color: transparent #ddd transparent transparent;
        border-width: 6px 7px 6px 5px;
        border-style: solid;
        position: absolute;
        top: 11px;
        left: -13px;
    }
    .chatcon:after {
        content: " ";
        border-width: 5px 7px 5px 4px;
        border-color: transparent #fff transparent transparent;
        border-style: solid;
        position: absolute;
        top: 12px;
        left: -11px;
    }

    .chatconin {
        background: #f1f1f1;
        padding: 0;
        > p:nth-child(1) {
            padding: .14rem;
            background: $backgroundw;
            border-bottom: 1px solid #eee;
            font-size: .3rem;
            color: $colortwo;
            border-radius: 5px;
        }
    }
}
.chatright {
          font-size: .3rem;
          padding: .14rem .18rem .14rem;
          @extend %flexbox;
          @extend %flex-rr;
          img {
              width: .8rem;
              height: .8rem;
              margin-top: 4px;
          }
          .chatwith {
              @extend %flexbox;
              @extend %flex-ju-end;
              @extend %flex-c;
              @extend %flex-ali-end;
              max-width:75%;
              background: #fff;
              > span {
                  font-size: .22rem;
                  color: #888;
                  margin-right: .25rem;
              }
          }
          .chatcon {
              padding: .14rem;
              border: 1px solid #7fdb5e;
              border-radius: 5px;
              background: #9fe75a;
              position: relative;
              margin-right: .25rem;
          }
          .chatcon:before {
              content: '';
              border-color: transparent transparent transparent #7fdb5e;
              border-width: 6px 5px 6px 7px;
              border-style: solid;
              position: absolute;
              top: 11px;
              right: -13px;
          }
          .chatcon:after {
              content: " ";
              border-width: 5px 4px 5px 7px;
              border-color: transparent transparent transparent #9fe75a;
              border-style: solid;
              position: absolute;
              top: 12px;
              right: -11px;
          }
      }
/*.home{
  text-align: center;
  position:absolute;
  display: none;
  width:100%;
}
.chatroom{
  width:100%;
}
.scroll section{
  background:#f1f1f1;
}
.chatleft{
  font-size: 16px;;
  padding: 7px 9px 7px;
}
.chatwith{
  max-width: 75%;
  margin-top: -5px;
  background: #f1f1f1;
}
.chatwith span{
  font-size:12px;
  color:#888;
  margin-left:10px;
}
.chatleft img{
  width:40px;
  height:40px;
  display: block;
}
.header{
  color:#28AFF5;
  text-align: center;
  height:44px;
  line-height: 44px;
  border-bottom:1px solid #eee
}
.header i{
  float:left;
  margin-left: 10px;
}
.name{
  color:#10afff;
  font-weight:bold;
}
.robot{
  color:#28AFF5
}
.start{
  background:#28AFF5;
  color:#fff;
  margin:0 auto;
  border-radius:5px;
}
@media screen and (max-width:1200px) {


}

@media screen and (max-width:992px) {
  img{
    width:180px;
    margin:0 auto;
    margin-top:100px;
  }
  .name{
    font-size:42px;
  }
  .robot{
    font-size:24px;
  }
  .start{
    margin-top:300px;
    height:60px;
    line-height: 60px;
    font-size:34px;
    width:300px;
  }
}
@media screen and (max-width:768px) {
  img{
    width:180px;
    margin:0 auto;
    margin-top:100px;
  }
  .name{
    font-size:42px;
  }
  .robot{
    font-size:24px;
  }
  .start{
    margin-top:300px;
    height:60px;
    line-height: 60px;
    font-size:34px;
    width:300px;
  }
}
@media screen and (max-width:600px) {
  img{
    width:100px;
    margin:0 auto;
    margin-top:100px;
  }
  .name{
    font-size:32px;
  }
  .robot{
    font-size:18px;
  }
  .start{
    margin-top:150px;
    height:44px;
    line-height: 44px;
    font-size:20px;
    width:200px;
  }
}*/
</style>
