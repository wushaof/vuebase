import io_ from './socket.io';
import con from './serverAddr.js'
var callbackList={};
var userInfo;
var io;
export default{
  emitMsg:function(name,json){
    io.emit(name, json);
  },
  con:function(){
    if (io === undefined || io === null){
      io = io_.connect(con.getSocket());
    }
  },
  init:function(_userInfo){
    userInfo = _userInfo;
    this.con();
    this.emitMsg("login",_userInfo);
    var that = this;
    io.on("newIntelligentText",function(result){ //接收智能问答文本消息
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['chat']){
          callbackList['chat'](state,result.msg);
        }
        if(callbackList && callbackList['message']){
          callbackList['message'](state,result.msg);
        }

      }
    });
    io.on("newIntelligentRecommend",function(result){  //监听律师推荐问题
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['recommend']){
          callbackList['recommend'](state,result.msg);
        }
        if(callbackList && callbackList['message']){
          callbackList['message'](state,result.msg);
        }
      }
    });
    io.on("responseIntelligentOption",function(result){  //卡卡卡
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['responseIntelligentOption']){
          callbackList['responseIntelligentOption'](state,result.msg);
        }
      }
    });
    io.on("responseIntelligentText",function(result){  //卡卡卡
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['responseIntelligentText']){
          callbackList['responseIntelligentText'](state,result.msg);
        }
      }
    });
    io.on("responseMind",function(result){  //监听送心意回调
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['responseMind']){
          callbackList['responseMind'](state,result.msg);
        }
      }
    });
    io.on("newUserAnswerResult",function(result){  //抢单结果通知

      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['newUserAnswerResult']){
          callbackList['newUserAnswerResult'](state,result);
        }
      }
    });
    io.on("responseMsg",function(result){  //老咨询发送文本消息回调
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['responseMsg']){
          callbackList['responseMsg'](state,result.msg);
        }
      }
    });
    io.on("newMsg",function(result){  //老咨询发送文本消息回调
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['responseMsg']){
          callbackList['responseMsg'](state,result.msg);
        }
        if(callbackList && callbackList['message']){
          callbackList['message'](state,result.msg);
        }
      }
    });
    io.on("newChatInfo",function(result){  // 咨询状态改变
      if(result.code==0){
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['newChatInfo']){
          callbackList['newChatInfo'](state,result.msg);
        }
      }
    });
    io.on("newIntelligentNext",function(result){  // 接收分类下一个问题
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['questiontreetype']){
          callbackList['questiontreetype'](state,result.msg);
        }
    });
    io.on("postIntelligentOption",function(result){  //提交选项
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['postIntelligentOption']){
          callbackList['postIntelligentOption'](state,result.msg);
        }
    });
    io.on("join_room",function(result){  //加入聊天室
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['join_room']){
          callbackList['join_room'](state,result.msg);
        }
    });
    io.on("newConclusionSend",function(result){  //新的报告消息提醒
        var state={code:result.code,flag:''};
        if(callbackList && callbackList['newConclusionSend']){
          callbackList['newConclusionSend'](state,result.msg);
        }
        if(callbackList && callbackList['message']){
          callbackList['message'](state,result.msg);
        }
    });
    io.on("reconnect",function(e){//用户端和律师端
      that.emitMsg('reconnection',userInfo);
    });
  },
  addcallback:function(callback){
    if(callback){
      callbackList[callback.key]=callback.value;
    }
  },
  removecallback:function(key){
    if(callbackList && callbackList[key]){
      callbackList[key]=null;
    }
  }

}
