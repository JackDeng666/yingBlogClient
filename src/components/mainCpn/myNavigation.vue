<template>
<!-- <div class="navbar"> -->
<div :class="isShowNav?'navbar':'navbar navbar-move'">
  <div class="center">
    <!-- <img :src="headIcon" class="icon"> -->
    <!-- 导航栏 -->
    <ul :class="drawerIsOpen?'nav mobile-nav-show':'nav'">
      <i class="fa fa-times hide-menu-btn" @click="drawerIsOpen=!drawerIsOpen"></i>
      <li :class="activeId==0?'active':''" @click="changeActive(0)"><router-link to="/home"><i class="fa fa-wa fa-home"></i>首页</router-link></li>
      <li :class="activeId==1?'active':''" @click="changeActive(1)"><router-link to="/bloglist"><i class="fa fa-wa fa-archive"></i>博客列表</router-link></li>
      <li :class="activeId==2?'active':''" @click="changeActive(2)"><router-link to="/messageboard"><i class="fa fa-wa fa-envelope"></i>留言板</router-link></li>
      <li :class="activeId==3?'active':''" @click="changeActive(3)"><router-link to="/aboutme"><i class="fa fa-wa fa-vcard"></i>关于我</router-link></li>
    </ul>
    <!-- 移动端导航按钮 -->
    <i class="el-icon-menu btn-mobile" @click="drawerIsOpen=!drawerIsOpen"></i>
    <!-- 登录注册 & 用户信息 -->
    <div class="user-info">
      <!-- 没登陆 -->
      <div v-if="!hasLogin" class="nologin">
        <a href="#/logorsign?status=0">登录</a>&nbsp;<a href="#/logorsign?status=1">注册</a>
      </div>
      <!-- 登录后 -->
      <div v-if="hasLogin" class="haslogin">
        <div class="user-item">
          <p>{{userInfo.nick_name?userInfo.nick_name:'还没设置呢称呢'}}</p>
          <ul>
            <li><i class="fa fa-fw fa-user"></i><a href="#/userinfo">个人中心</a></li>
            <li><i class="fa fa-fw fa-star"></i><a href="#/usercollect">收藏列表</a></li>
            <li><i class="fa fa-fw fa-arrow-left"></i><a href="javascript:void(0);" @click="LoginOut">退出登录</a></li>
          </ul>
        </div>
        <img :src="userInfo.avatar?userInfo.avatar:defaultImg">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  data () {
    return {
      drawerIsOpen: false,
      activeId: 0,
    }
  },
  computed: mapState(['hasLogin','isShowNav','userInfo','defaultImg','headIcon']),
  methods: {
    ...mapMutations(['changeHasLogin','addUser']),
    LoginOut(){
      this.changeHasLogin(0)
      localStorage.removeItem('jdtoken')
      this.addUser({})
      if(this.$route.path=='/userinfo'){
        this.$router.push('/logorsign')
      }
    },
    changeActive(id){
      this.activeId = id
      this.drawerIsOpen = false
    },
    changeDrawerIsOpen(){          //移动端开关导航
      this.drawerIsOpen = false
    }
  }
}
</script>

<style scoped>
/* 导航 */
.navbar {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);  
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
  z-index: 100;
  transition: .5s;
}
.navbar-move {
  top: -100px;
}
.center {
  position: relative;
  display: flex;
  align-items: center;
  width: 1110px;
  height: 100%;
  margin: 0 auto;
}
/* 图标 */
/* .icon {
  width: 31px;
  height: 45px;
  margin-right: 10px;
} */
/* 导航栏 */
.nav {
  display: block;
}
.nav li {
  position: relative;
}
.nav li>a {
  display: block;
  font-weight: bold;
  font-size: 15px;
  position: relative;
  text-align: center;
  color: #333;
  padding: 2px 10px;
  margin: 0 8px;
  transition: 0.5s;
  height: 30px;
  line-height: 30px;
}
/* #e91e63 #0ebbf0 */
.nav li>a:hover {
  color: #fff;
}
.nav li>a:before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: -2px;
  width: 100%;
  height: 100%;
  border:2px dashed #e91e63;
  transition: 0.5s;
  opacity: 0;
  z-index: -2;
}
.nav li>a:hover:before {
  opacity: 1;
  border-color:#e91e63;
  transform: scale(1.1);
}
.nav li>a:after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #e91e63;
  transform: scale(0);
  transition: 0.5s all;
  z-index: -2;
}
.nav li>a:hover:after {
  transform: scale(1);  
  background: #e91e63;
}
.nav .active>a:before {
  opacity: 1;
  border-color: #e91e63;
  transform: scale(1);
}
.nav .active>a:after {
  transform: scale(1);
  background: #e91e63;
}
.nav .active>a {
  color: #fff;
}
/* 登录&用户信息 */
.user-info {
	height: 100%;
	position: absolute;
	right: 10px;
	top: 0;
  color: #000;
}
.nologin a {
  line-height: 50px;
  font-size: 14px;
  padding: 8px 12px;
  margin-left: 5px;
  background-color: #f2f2f2;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, .2);
  color: #757575;
  border-radius: 2px; 
	transition: all 0.4s ease-out;
}
.nologin a:hover {
  background-color: #4387fd;
  color: #fff;
}
/* 已经登录 */
.haslogin {
  position: relative;
	cursor: pointer;
  width: 10rem;
  text-align: center;
}
.haslogin p {
  margin-top: 30px;
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-bottom: 1px solid #efefef;
}
.haslogin .user-item {
  display: none;
  position: absolute;
  top: 50px;
  width: 100%;
  background: #fff;
  box-shadow: 1px 1px 5px rgba(0,0,0,.2);
  border-radius: 3px;
}
.haslogin img {
  position: absolute;
  top: 0.3rem;
  left: 3.8rem;
  border-radius: 50%;
  border: 0px solid #fff;
  width: 2.4rem;
  height: 2.4rem;
  object-fit: cover;
  transition: .3s;
}
.haslogin:hover .user-item {
  display: block;
}
.haslogin:hover img {
  border: 2px solid #fff;
  top: 1.8rem;
  transform: scale(1.5);
}
.user-item ul li {
	height: 2.4rem;
  line-height: 2.4rem;
  color: grey;
	font-size: 14px;
  transition: .3s;
}
.user-item ul li a{
  color: gray;
	font-size: 14px;
  transition: .3s;
}
.user-item ul li:hover {
	background: #efefef;
  color: #0ebbf0;
}
.user-item ul li:hover a{
  color: #0ebbf0;
}
@media (max-width: 960px) {
  .center {
    width: 100%;
  }
}
@media (max-width: 700px) {
  .nav{
    position: fixed;
    width: 100%;
    height: 100vh;
    background: #efefef;
    left: -100%;
    top: 0;
    text-align: center;
    padding: 80px 0;
    line-height: normal;
    transition: .7s;
    z-index: 1;
  }
  .mobile-nav-show {
    left: 0;
  }
  .nav li {
    display: block;
    padding: 15px 50px;
  }
  .btn-mobile {
    display: block;
    font-size: 25px;
    margin-left: 10px;
  }
  .hide-menu-btn{
    position: absolute;
    top: 15px;
    left: 15px;
    font-size: 30px;
  }
}
@media (min-width: 700px) {
  .nav{
    display: flex;
  }
  .btn-mobile,.hide-menu-btn{
    display: none;
  }
}
</style>