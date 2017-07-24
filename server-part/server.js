var express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io').listen(server),
    port = 3000;

server.listen(port);
console.log(`已监${port}听端口，系统已经运行`);

var userList = [];

io.on('connection', function(socket) {
  //用户注册
  socket.on("login", function(userInfo){
    userList.push(userInfo);
    const last = userList.length - 1;
    var msg = `新用户${userInfo.name}进入`;
    console.log(`${msg}, id:${userInfo.id}`);
    //对客户端的新用户进入提醒
    io.sockets.emit("newsFromServer", {msg: msg});
  });
  //接收用户发送的消息并转发送给其他用户
  socket.on("msgFromClient", function(info) {
    //广播给除自己以外所有用户
    var info = makeInfo(info)
    socket.broadcast.emit('msgFromServer', info);
    // if(user.hasExisted(id)) {
    //   info.status = "success";
    //   io.socket.emit('sendMesToClient', info);
    // }else {
    //   info.status = "failure";
    //   io.socket.emit('sendMesToClient', info);
    // }
  });
});

// 获得当前时分秒
function getTimeHMS() {
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
//组成发布的信息
function makeInfo(oldInfo, msg) {
  const time = getTimeHMS();
  var info ={
    id: oldInfo.id,
    name: oldInfo.name,
    time: time,
    msg: oldInfo.msg
  }
  return info;
}
//检查用户是否存在
function testUserExits() {

}
