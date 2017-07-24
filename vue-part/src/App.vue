<template>
  <div id="app">
    <!-- 顶部栏 -->
    <el-row id="app_header" class="">
      <h3 class="app_header_title toInlineBlock">{{title}}[{{userName}}]</h3>
      <span class="app_header_quite toInlineBlock">[退出]</span>
    </el-row>
    <el-row>
      <el-row>
        <el-col :span="4" class="app_menu_wrap">
          <el-menu default-active="2"
          class="el-menu-vertical-demo" >
            <el-menu-item index="1-1">用户1</el-menu-item>
            <el-menu-item index="1-2">用户2</el-menu-item>
            <el-menu-item index="3">用户3</el-menu-item>
          </el-menu>
        </el-col>

        <!-- 导航栏右侧=>聊天模块 -->
        <el-col :span="20">
          <el-row class="" type="flex" justify="center">
            <el-col :span="20" class="wechat_wrap booderShow">
              <el-row class="content_wrap" type="flex" justify="center">
                <el-col  :span="23" class="content booderShow"
                 >
                  <el-row v-for="data in chatContent" class="content_wrap">
                    <div  v-if="data.kind == 'msg'"
                    v-bind:class="[data.isMyMsg ? 'myMessage_content' : 'otherMessage_content']">
                      <strong>{{data.name}}: </strong><span>{{data.content}}</span>
                    </div>
                    <div class="time_content" v-else>
                      <span>{{data.time}}</span>
                    </div>
                  </el-row>
                </el-col>
              </el-row>
              <el-row class="chat_wrap" type="flex" justify="center">
                <el-col :span="23" class="chat booderShow">
                  <el-row class="chat_toolBar booderShow">
                    <el-col :span="24">
                      <i class="el-icon-star-on"></i>
                      <i class="el-icon-picture"></i>
                      <el-button type="success" size="mini"
                       id="sendMsgButton" @click="sendMessage">
                        发送
                      </el-button>
                    </el-col>
                  </el-row>
                  <el-row class="chat_content_wrap booderShow">
                    <el-col :span="24">
                      <textarea class="chat_content"
                        placeholder="请输入想要发送内容"
                        v-model="messageContent">
                      </textarea>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
    </el-row>

    <el-dialog title="请输入用户名" :visible.sync="getNameDiaLogOpen">
      <el-form>
        <el-input v-model="userName" auto-complete="off"></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendNewUserToServer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import wechat from './js/app.js';
export default wechat;
</script>

<style>
@import url('./css/app.css');
* {
  padding:0;
  margin: 0;
}
#app {
  width: 100%;
}
.booderShow {
  border: 1px black solid;
}
.toInlineBlock {
  display: inline-block;
}
/*顶部栏*/
#app_header {
  height: 75px;
  display: relative;
  background-color: #1D8CE0;
}
#app_header .app_header_title {
  height: 100%;
  color: white;
  line-height: 75px;
  position: absolute;
  left: 20px;
  bottom: 5px;
  font-size: 28px;
  cursor: default;
}
#app_header .app_header_quite {
  height: 100%;
  color: white;
  line-height: 75px;
  position: absolute;
  right: 30px;
  font-size: 23px;
  font-weight: lighter;
  cursor: pointer;
}
#app_header .app_header_quite:hover {
  font-weight: bold;
}
</style>
