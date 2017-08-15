/*const Con =(function(){
  class Con {
    constructor() {

    }
  }
})();*/

let cons = {
  http:"http://192.168.1.38:3000",
  socket:"http://192.168.1.38:4000/legal/",
  wxmpServer:"http://test.pay.fali-inc.com"

}
let _env ;
function setEnv(env){
    if (env === "production"){
      cons.http = "http://legal.bluewhale-inc.com";
      cons.socket = "http://chat.legal.bluewhale-inc.com/legal/";
      cons.wxmpServer = "http://wechat.fali-inc.com";
    }
    _env = env;
}
function getEnv(){
  return _env;
}
function getHttp(){
  return cons.http;
}
function getSocket(){
  return cons.socket;
}
function getRedirect(){
  return cons.wxmpServer+"/index.html";
}

export default{
  setEnv,
  getHttp,
  getSocket,
  getRedirect,
  getEnv
}
