import con from './dependjs/serverAddr.js'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Mint from 'mint-ui'
// import axios from 'axios'
import routes from './routerConfig.js'
import Iscroll from './dependjs/iscroll.js'
import Ios from './dependjs/ios.js'
import wx from 'weixin-js-sdk'
import 'mint-ui/lib/style.css'
import './assets/base.css'
import './assets/wsf.css'
import './assets/iconfont.css'
import './assets/zn.css'
import ajax from './dependjs/ajax.js'
/**
* 设置环境变量
*/
var ENV;
try{
	ENV = _PROCESS_NODE_ENV_;
}catch(e){

}
if (ENV === "production"){	// 线上环境
	global.env = 'production';
	con.setEnv('production');
}else{	// 开发环境
	global.env = 'develop';
	con.setEnv('develop');
}


Vue.use(VueRouter)
Vue.use(Mint)

sessionStorage.setItem('userInfo',JSON.stringify({}));
const router=new VueRouter({
	// mode: 'history',
	routes
})

// axios.interceptors.request.use(function (config) {
// 	// stores.dispatch('showLoading')
// 	return config;
// }, function (error) {
//   return Promise.reject(error);
// });
//
// axios.interceptors.response.use(function (response) {
// 	// stores.dispatch('hideLoading')
// 	return response;
// }, function (error) {
//
//   return Promise.reject(error);
// });


// Vue.prototype.$http = axios
Vue.prototype.Scroll=Iscroll
Vue.prototype.isAndroid=true
Vue.prototype.isIos=false
Vue.prototype.Ios=Ios
Vue.prototype.api=con.getHttp()
Vue.prototype.ajax=ajax.ajax.ajax
Vue.prototype.wx=wx


//Vue.prototype.io=io_

new Vue({
  router,
  // store:stores,
  el: '#app',
  render: h => h(App)
})
