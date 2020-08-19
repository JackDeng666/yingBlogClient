<!-- 用户中心 -->
<template>
<div class="root">
  <div class="tab">
    <div :class="{active:activeTab===1}" @click="activeTab=1">
      <i class="fa fa-address-book-o"></i> 用户信息
    </div><div :class="{active:activeTab===2}" @click="activeTab=2">
      <i class="fa fa-edit"></i> 修改资料
    </div><div :class="{active:activeTab===3}" @click="activeTab=3">
      <i class="fa fa-file-image-o"></i> 更换头像
    </div>
  </div>
  <div class="content">
    <!-- 用户信息 -->
    <div v-show="activeTab===1" class="userinfo-box">
      <ul>
        <li>
          <img 
            :src="userInfo.avatar?userInfo.avatar:defaultImg"
            class="avatar"/>
        </li>
        <li><span class="left-title">昵称：</span><span>{{userInfo.nick_name?userInfo.nick_name:"无"}}</span></li>
        <li><span class="left-title">性别：</span><span v-html="userSex"></span></li>
        <li><span class="left-title">账号：</span><span>{{userInfo.user_name?userInfo.user_name:"无"}}</span></li>
        <li><span class="left-title">邮箱：</span><span>{{userInfo.email?userInfo.email:"无"}}</span></li>
        <li><span class="left-title">个性标签：</span><span>暂未开放</span></li>
      </ul>
    </div>
    <!-- 修改信息 -->
    <div v-show="activeTab===2" class="edit-userinfo-box">
      <ul>
        <li>
          <div class="title">性别</div>
          <div class="edit">
            <el-radio v-model="newUserInfo.sex" :label="1">男</el-radio>
            <el-radio v-model="newUserInfo.sex" :label="2">女</el-radio>
            <el-radio v-model="newUserInfo.sex" :label="3">秘密</el-radio>
          </div>
        </li>
        <li>
          <div class="title">昵称</div>
          <div class="edit"><input placeholder="昵称" v-model="newUserInfo.nick_name"></div>
        </li>
        <li>
          <div class="title">个性标签</div>
          <div class="edit"><input placeholder="暂未开放" disabled></div>
        </li>
      </ul>
      <div class="save-button">
        <el-button type="success" round @click="submit">确认修改</el-button>
      </div>
    </div>
    <!-- 更换头像 -->
    <div v-show="activeTab===3" class="edit-avatar-box">
      <el-upload 
        class="avatar-uploader"
        :action="upUrl + 'resource/uploadUserAvatar'"
        :data="userInfo"
        name="avatarImg"
        :show-file-list="false"
        :on-success="handleUploadSuccess"
        :before-upload="beforeAvatarUpload">
        <img
          v-if="newUserInfo.avatar"
          :src="newUserInfo.avatar"
          class="avatar"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="tip" class="el-upload__tip">点击上传头像，只能上传jpg/png文件，且不超过1mb</div>
      </el-upload>
    </div>
  </div>
</div>
</template>

<script>
import { User } from "@/utils/api"
import { mapState, mapMutations } from "vuex"
import { addUserToken } from "@/utils/common"
import { UP_URL } from '@/utils/config'
export default {
  name: "userinfo",
  data() {
    return {
      activeTab:1,
      upUrl: UP_URL,
      isUploaded: false,
      newUserInfo:{}
    }
  },
  methods: {
    ...mapMutations(['addUser']),
    async update(){
      // 判断数据格式是否正确
      if(this.newUserInfo.nick_name.length > 7){
        this.$message.error('昵称长度要小于等于7')
        return false
      }else{
        let data = {
          avatar: this.newUserInfo.avatar,
          nickName: this.newUserInfo.nick_name,
          sex: this.newUserInfo.sex,
          userId: this.newUserInfo.id
        }
        console.log(data)
        let res = await User.updateUserInfo(data)
        console.log(res)
        let result = await User.getUserInfo({getBy: this.userInfo.email})
        this.addUser(result.data.data.userInfo)
        this.isEdit = false
        return true
      }
    },
    // 点击提交修改信息
    async submit(){
      let isOk = await this.update()
      if(isOk){
        this.$message.success('修改成功')
      }
    },
    // 上传前检查
    beforeAvatarUpload(file) {
      const isAllowFormat = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isAllowFormat) {
        this.$message.error('上传头像图片只能是Jpg,Png,Gif格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isAllowFormat && isLt1M
    },
    // 上传头像的时候直接提交一次用户信息
    handleUploadSuccess(res, file) {
      this.newUserInfo.avatar = res.url
      this.update()
    }
  },
  computed: {
    ...mapState(['userInfo','defaultImg']),
    userSex(){
      switch(this.userInfo.sex){
        case 1:
          return '<i class="fa fa-mars"></i> 男'
          break
        case 2:
          return '<i class="fa fa-venus"></i> 女'
          break
        case 3:
          return '<i class="fa fa-transgender"></i> 秘密'
          break
      }
    }
  },
  created() {
    // 不让新的数据指向本来的数据
    this.newUserInfo = JSON.parse(JSON.stringify(this.userInfo))
  }
}
</script>

<style>
/* 切换 */
.tab {
  z-index: 1;
}
.tab div {
  display: inline-block;
  padding: 0 10px;
  line-height: 40px;
  border: 1px solid #e1e1e1;
  border-top: 3px solid #e1e1e1;
  margin: 0 -1px -1px 0;
  cursor: pointer;
  background: #fff;
  transition: .3s;
}
.tab div.active {
  border-bottom-color: #fff;
  border-top: 3px solid #3498db;
  color: #3498db;
}
.content {
  background: #fff;
  padding: 20px 20px;
  border: 1px solid #e1e1e1;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
/* 个人信息 */
.userinfo-box {
  margin: 0 auto;
  min-width: 285px; 
  max-width: 400px; 
}
.userinfo-box li {
  padding: 15px;
  border: 1px solid #efefef;
  border-top: 1px solid #fff;
}
.userinfo-box li:first-child {
  border-top: 1px solid #efefef;
}
.userinfo-box li .left-title {
  display: inline-block;
}
.userinfo-box li img {
  margin: 0 auto;
}
/*修改个人*/
.edit-userinfo-box li {
  padding: 10px;
}
.edit-userinfo-box .title {
  margin-bottom: 10px;
}
.edit-userinfo-box .edit input{
  border: 0;
  outline: none;
  padding: 10px 10px;
  border: 1px solid #ddd;
  width: 95%;
}
.save-button {
  text-align: center;
}
/* 头像 */
.avatar-list {
  position: relative;
}
.edit-avatar-box {
  text-align: center;
}
.avatar-uploader {
  display: inline-block;
  vertical-align: top;
}
.avatar-uploader .el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}
</style>
