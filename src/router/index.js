import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

import Home from "@/pages/Home"
import BlogList from "@/pages/BlogList"
import MessageBoard from "@/pages/MessageBoard"
import AboutMe from "@/pages/AboutMe"
import BlogDetail from "@/pages/BlogDetail"
import LogOrSign from "@/pages/LogOrSign"
const UserInfo = () => import("@/pages/UserInfo")
const UserCollect = () => import("@/pages/UserCollect")
// 懒加载
// const Home = () => import("@/pages/Home")
// const BlogList = () => import("@/pages/BlogList")
// const MessageBoard = () => import("@/pages/MessageBoard")
// const AboutMe = () => import("@/pages/AboutMe")
// const BlogDetail = () => import("@/pages/BlogDetail")
// const LogOrSign = () => import("@/pages/LogOrSign")
// const UserInfo = () => import("@/pages/UserInfo")
// const UserCollect = () => import("@/pages/UserCollect")

const router = new Router({
  routes: [
    { path: '/', redirect: '/home' }, // 首页
    { path: '/home', component: Home, name: 'home' }, // 首页
    { path: '/bloglist', component: BlogList, name: 'bloglist' }, // 博客列表
    { path: '/messageboard', component: MessageBoard, name: 'messageboard' }, //留言板
    { path: '/aboutme', component: AboutMe, name: 'aboutme' }, // 关于
    { path: '/blogdetail', component: BlogDetail, name: 'blogdetail' }, // 博客详情
    { path: '/logorsign', component: LogOrSign, name: 'logorsign' }, // 登录和注册
    { path: '/userinfo', component: UserInfo, name: 'userinfo' }, // 用户个人中心
    { path: '/usercollect', component: UserCollect, name: 'usercollect' }, // 用户收藏博客列表
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: document.querySelector("#container").offsetTop - 60 }
  }
})

// 路由守卫,用户信息和用户列表需登录后查看
router.beforeEach((to, from, next) => {
  if (to.path === '/userinfo' || to.path === '/usercollect') {
    store.state.hasLogin ? next() : next('/logorsign')
  } else {
    next()
  }
})

export default router
