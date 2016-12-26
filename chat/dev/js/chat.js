let ChatModule = {
    init:function(){
        let self = this;
        self.domInit();
        self.event();
    },
    domInit:function(){
      let self = this;

      self.domLoginView = document.querySelector('#LoginView');
      self.domLogin = document.querySelector('#Login');
      self.domNickName = document.querySelector('#NickName');

      self.domMsgView = document.querySelector('#MsgView');
      self.domMsgText = document.querySelector('#MsgText');
      self.domMsgSend = document.querySelector('#MsgSend');

      self.domChatView= document.querySelector('#ChatView');
      self.domMsgView = document.querySelector('#MsgView');
      self.viewInit();

    },
    viewInit:function(){
        let self =this;
        self.nClientWidth = document.body.clientWidth || document.documentElement.clientWidth;
        self.nClientHeight = document.body.clientHeight || document.documentElement.clientHeight;
        self.domChatView.style.height = window.document.documentElement.clientHeight + 'px';
        self.domMsgView.style.height = window.document.documentElement.clientHeight + 'px';
    },
    event:function(){
        let self = this;
        window.addEventListener('resize',function(){
            self.viewInit();
        })
        self.domLogin.addEventListener('click',function(){
            let sNick = self.domNickName.value;
            if(!sNick){
                alert('名字还是要填的!')
                return false;
            }
            self.domLoginView.style.display = 'none';
            self.sNick = sNick;
            self.socketConn({
                nick:self.sNick,
                type:'Prompt',
                msg:self.sNick+'加入了聊天'
            });

        })
        self.domMsgSend.addEventListener('click',function(){
            let sMsg = self.domMsgText.value;
            if(!sMsg){
                alert('消息还是要填的!')
                return false;
            }
            self.domMsgText.value = '';
            self.wsSend({
                nick:self.sNick,
                type:'Send',
                msg:sMsg
            });
        })
    },
    socketConn:function(rs){
        let self = this;
        self.ws = new WebSocket("ws://chat.fenghou.site:8181");
        self.ws.onopen = function (e) {
            console.log('Connection to server opened');
            let msg = rs;
            if (self.ws.readyState === WebSocket.OPEN) {
                self.wsSend(msg);
            }
        }
        self.ws.onmessage= function (e) {
            self.appendMsg(JSON.parse(e.data));
        };
    },
    wsSend:function(rs){
        let self = this;
        self.ws.send(JSON.stringify(rs));
    },
    appendMsg:function(rs){
        let self = this,
            _shtml = self.domMsgView.innerHTML;
        if(rs.type =='Prompt'){
            _shtml += ' <div class="system"> <span>'+rs.msg+'</span> </div>'
        }
        if(rs.type == 'Send'){
            if(rs.nick == self.sNick){
                _shtml += ' <div class="msg"> ' +
                    '<div class="ico right"> ' +
                    '<div class="img"> </div> ' +
                    '<div class="nick">'+rs.nick+'</div> ' +
                    '</div> ' +
                    '<div class="text right">'+rs.msg+'</div> ' +
                    '</div>'
            }
            else{
                _shtml += ' <div class="msg"> ' +
                    '<div class="ico"> ' +
                    '<div class="img"> </div> ' +
                    '<div class="nick">'+rs.nick+'</div> ' +
                    '</div> ' +
                    '<div class="text">'+rs.msg+'</div> ' +
                    '</div>'
            }
        }
        self.domMsgView.innerHTML = _shtml;


    }
}
ChatModule.init();