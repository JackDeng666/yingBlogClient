<!-- 登录注册 -->
<template>
<div>
  <div :class="status?'log-or-sign-box register':'log-or-sign-box login'">

    <img :src="image">

    <div class="switch">
      <span @click="status=0">登录</span>
      <span>/</span>
      <span @click="status=1">注册</span>
    </div>

    <div class="form">
      <input type="text" placeholder="账号" v-model="loginName" maxlength="20"/>
      <input type="password" placeholder="密码" v-model="password" maxlength="16"/>
      <input type="password" placeholder="确认密码" v-model="repeatPassword" id="repeat" maxlength="16"/>
      <input type="text" placeholder="昵称" v-model="nickName" id="nick-name"/>
      <input type="text" placeholder="邮箱" v-model="email" id="email"/>
      <div class="verification">
        <input type="text" placeholder="验证码" v-model="verificationCode" maxlength="6">
        <button @click="sendVerificationCode">发送验证码</button>
      </div>
      <button @click="loginFun" id="log-btn">登录</button>
      <button @click="registerFun" id="res-btn">注册</button>
    </div>
  </div>
</div>
</template>

<script>
import { User } from "@/utils/api"
import { addUserToken } from "@/utils/common"
import { mapMutations } from 'vuex'

export default {
  name: "logorsign",
  data() {
    return {
      image: require('../../public/img/favicon.png'),
      status: 0,
      loginName: '',
      password: '',
      repeatPassword: '',
      nickName: '',
      email: '',
      verificationCode: '',
      trueVerificationCode: ''
    }
  },
  methods: {
    ...mapMutations(['changeHasLogin','addUser']),
    routeChange(){
      this.status = Number(this.$route.query.status)
    },
    statusChange(){
      this.resetForm()
    },
    resetForm(){
      this.nickName = ''
      this.email = '',
      this.loginName = '',
      this.password = '',
      this.repeatPassword = ''
      this.verificationCode = ''
    },
    // 登录
    async loginFun(){
      let loginData = {
        loginName: this.loginName,
        password: this.password,
      }
      let result = await User.login(loginData)
      if(result.data.meta.status === 1){
        this.$message.success('登录成功')
        this.changeHasLogin(1)
        const {token} = result.data
        addUserToken(token,this.addUser)
        this.$router.push('/userinfo')
      }else{
        this.$message.error(result.data.meta.msg)
      }
    },
    // 发送验证码
    async sendVerificationCode(){
      if(this.emailValidate(this.email)){
        if(this.trueVerificationCode === ''){
          let result = await User.getVerificateCode({toEmail: this.email})
          if(result.data.meta.status === 1){
            this.$message.success('邮箱验证码发送成功!')
            this.trueVerificationCode = result.data.data.emailCode
            setTimeout(() => {
              this.trueVerificationCode = ''
            }, 1000*60*3)
          }else{
            this.$message.error(result.data.meta.msg)
          }
        }else{
          this.$message.warning('验证码已经发送,3分钟才过期')
        }
      }
    },
    // 注册
    async registerFun(){
      if(this.loginNameValidate(this.loginName)
        &&this.passwordValidate(this.password,this.repeatPassword)
        &&this.nickNameValidate(this.nickName)){
          // 判断验证码是否过期清除
          try {
            // 判断验证码是否正确
            if( this.trueVerificationCode === this.verificationCode){
              let registerUser = {
                userName: this.loginName,
                nickName: this.nickName,
                email: this.email,
                password: this.password
              }
              let result = await User.register(registerUser)
              if(result.data.meta.status === 1){
                this.$message.success('注册成功')
                this.status = 0
                this.trueVerificationCode = ''
              }else{
                this.$message.error(result.data.meta.msg)   
              }
            }else{
              this.$message.error('验证码不正确')
            }
          } catch (error) {
            this.$message.error('验证码没发送或已过期')
          }
      }
    },
    // 注册所有验证方法
    loginNameValidate(str){
      if(!/^[0-9a-zA-Z]+$/.test(str)){
        this.$message.warning('账号要由字母或数字组成')
        return false
      }else if(str.length<6){
        this.$message.warning('登录名不能小于6位')
        return false
      }else{
        return true
      }
    },
    nickNameValidate(str){
      if(str.length<1||str.length>8){
        this.$message.warning('昵称不能为空或大于8位')
        return false
      }else{
        return true
      }
    },
    passwordValidate(str1,str2){
      if(!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(str1)){
        this.$message.warning('密码必须由字母和数字一起组成')
        return false
      }else if(str1.length<6){
        this.$message.warning('密码不能小于6位')
        return false
      }else if(!(str1===str2)){
        this.$message.warning('两次输入密码不一致')
        return false
      }else{
        return true
      }
    },
    emailValidate(str){
      if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(str)){
        this.$message.warning('邮箱格式不正确')
        return false
      }else{
        return true
      }
    }
  },
  watch:{
    '$route':'routeChange',
    'status':'statusChange'
  },
  mounted(){
    this.status = Number(this.$route.query.status)
  } 
}
</script>

<style scoped>
.log-or-sign-box{
  background: #fff;
  padding:40px;
  max-width:320px;
  min-height: 100%;
  margin:20px auto;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
}
.log-or-sign-box img{
  position: absolute;
  width: 80px;
  height: 80px;
  top: -40px;
  left: 40%;
  border: 5px solid #fff;
  border-radius: 50%;
  background-color: #fff;
  object-fit: cover;
}
/* 登录注册切换 */
.switch{
  position: relative;
  height:32px;
  line-height: 32px;
  margin: 20px 0;
}
.switch span{
  color: #ccc;
  font-size: 1.4rem;
  cursor: pointer;
  transition: .3s;
}
.login>.switch>span:nth-child(1),
.register>.switch>span:nth-child(3){
  color: #91bef0;
  font-size: 1.6rem;
}
.form{
  text-align: center;
}
/* 表单 */
.form>input{
  font-size: 1rem;
  display: block;
  border: 0;
  outline: none;
  background: 0;
  margin: 10px auto;
  text-align: center;
  border: 2px solid #3498db;
  width: 70%;
  height: 2.4rem;
  border-radius: 20px;
  transition: .3s;
  opacity: 1;
}
.form>input:focus{
  width: 75%;
  border-color: #f8b4c9;
}
/* 验证码 */
.verification{
  margin: 10px auto;
  border: 0;
  outline: none;
  width: 70%;
  min-height: 2.4rem;
  opacity: 1;
  transition: .3s;
}
.verification input{
  text-align: center;
  width: 40%;
  height: 2rem;
  border: 0;
  outline: none;
  border: 1.5px solid #3498db;
  border-radius: 20px;
}
.verification button{
  border: none;
  outline: none;
  height: 2rem;
  border-radius: 0.2rem;
  padding: 0 10px;
  background: #91bef0;
  color: #fff;
  font-size: 0.8rem;
  transition: .3s;
  cursor: pointer;
}
/* 按钮 */
.form>button{
  display: none;
  border: none;
  outline: none;
  margin: 0.5rem auto;
  width: 90%;
  height: 2.5rem;
  border-radius: 0.2rem;
  background: #91bef0;
  color: #fff;
  font-size: 1rem;
  transition: .3s;
  cursor: pointer;
}
.form button:hover{
  background: #f8b4c9;
}
/* 状态切换 */
.login .form>input#email,
.login .form>input#repeat,
.login .form>input#nick-name,
.login .form>.verification{
  margin: 0;
  height: 0;
  width: 0;
  border: 0;
  opacity: 0;
}
.login .form>button#log-btn,
.register .form>button#res-btn{
  display: block;
}
</style>
