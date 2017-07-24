import io from './../../lib/socket.io';
import user from './userChat.js'
import show from './showMessage.js'
var socket = io.connect("http://eva-3:3000");

var wechat = {
  data() {
    return{
      title: "wechat",
      messageContent: '', //用户输入的内容的数据绑定
      getNameDiaLogOpen: false,
      userName: '',
      chatContent: [],//聊天内容框的数据绑定,包含发送的消息和时间两种展示内容
    }
  },
  mounted() {
    this.connectionEvent();
    this.getNameDiaLogOpen = true;
  },
  methods: {
    //与server的连接事件
    connectionEvent () {
      //引入当前Vue组件,方便调用当前组件以及引用的ui库的方法
      var vue = this;
      //监听来自其他用户发送的消息
      socket.on("msgFromServer", function(info) {
        var time = {
            time: info.time,
            kind: 'time'
        };
        var data = {
            name: info.name,
            content: info.msg,
            isMyMsg: false,
            kind: 'msg'
        };
        vue.chatContent.push(time);
        vue.chatContent.push(data);
        console.log(`来自服务器的消息: ${info.msg}`);
      });
      //监听来自服务器的消息提示:新用户、用户离开、错误警告、提示等
      socket.on("newsFromServer", function(news) {
        vue.$message(news.msg);
      });
    },
    //向服务器发送用户写的消息
    sendMessage() {
      var msg = this.messageContent;
      user.sendMesToAll(socket, this.messageContent);
      var time = {
          time: this.getTimeHMS(),
          kind: 'time'
      };
      var data = {
          name: user.name,
          content: msg,
          isMyMsg: true,
          kind: 'msg'
      };
      this.chatContent.push(time);
      this.chatContent.push(data);
      this.messageContent = '';
    },
    //向服务器注册新用户
    sendNewUserToServer() {
      user.name = this.userName.trim();
      user.id = user.getrRandomId();
      user.login(socket);
      console.log(user.id);
      this.getNameDiaLogOpen = false;
    },
    getTimeHMS() {
      var time = new Date(),
          hour = time.getHours(),
          minute = time.getMinutes(),
          second = time.getSeconds();

      hour = hour<10 ? '0'+hour : hour;
      minute = minute<10 ? '0'+minute : minute;
      second = second<10 ? '0'+second : second;
      time = `${hour}:${minute}:${second}`;
      return time;
    }
  }
}

export default wechat;
