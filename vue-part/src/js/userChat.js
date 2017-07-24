
var user = {
  name: '',
  id: '',
  // 用户注册
  login(socket) {
    var userInfo = {
      id: this.id,
      name: this.name
    };
    socket.emit('login', userInfo);
  },
  // 发送消息
  sendMesToAll: function(socket, msg) {
    msg = msg.trim();
    if(msg == '') {
      return ;
    }
    if(this.name == '') {
      console.log('您还未注册');
      return ;
    }else {
      var info = {
        msg: msg,
        name: this.name,
        id: this.id
      }
      socket.emit("msgFromClient", info);
      return ;
    }
  },
  //获取不重复随机ID
  getrRandomId() {
    var date = new Date();
    return date.getTime();
  }
}

export default user;
