var show = {
  showMyMsg(info) {
    var name = info.name;
    var msg = info.msg;
    var time = info.time;
  },
  showOtherMsg(info) {

  },
  myMsgHtml(name, msg) {
    // var name = info.name;
    // var msg = info.msg;
    // var time = info.time;
    var html = `
    <el-row class="myMessage">
      <div class="myMessage_content">
        <strong>${name}: </strong><span>${msg}{{title}}</span>
      </div>
    </el-row>`;
    return html;
  },
  otherMsgHtml(name, msg) {
    // var name = info.name;
    // var msg = info.msg;
    // var time = info.time;
    var html = `
    <el-row type="flex" justify="start">
      <el-col :span="12">
        <strong>${name}: </strong><span>${msg}</span>
      </el-col>
    </el-row>`;
    return html;
  }
}

export default show;
