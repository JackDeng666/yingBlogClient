<template>
  <div id="app">
    <myNavigation/>
    <myBanner/>
    <div id="container">
      <el-row :gutter="20">
        <el-col :sm="24" :md="17" :lg="17">
          <transition name="fade" mode="out-in">
            <router-view v-if="isRouterAlive" style="min-height:600px;padding:0 16px;"></router-view>
          </transition>
        </el-col>
        <el-col :sm="24" :md="7" :lg="7">
          <rightCard></rightCard>
        </el-col>
      </el-row>
    </div>
    <myFooter/>
    <scroll/>
    <canvas id="fullScreenCanvas"/>
    <meting-js
      server="netease"
      type="playlist"
      :id="musicId"
      fixed="true"
      autoplay="true"
      v-if="musicShow">
    </meting-js>
  </div>
</template>

<script>
import { User } from "@/utils/api"
import { addUserToken } from "@/utils/common"
import { mapMutations, mapState } from 'vuex'
import canvasUtil from './utils/canvasObject/CanvasUtil'

import rightCard from '@/components/mainCpn/rightCard'
import myNavigation from '@/components/mainCpn/myNavigation'
import myBanner from '@/components/mainCpn/myBanner'
import myFooter from '@/components/mainCpn/myFooter'
import scroll from '@/components/mainCpn/scroll'

// const rightCard = () => import('@/components/mainCpn/rightCard')
// const myNavigation = () => import('@/components/mainCpn/myNavigation')
// const myBanner = () => import('@/components/mainCpn/myBanner')
// const myFooter = () => import('@/components/mainCpn/myFooter')
// const scroll = () => import('@/components/mainCpn/scroll')

export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
      musicShow: true
    }
  },
  components: {
    myNavigation,
    myBanner,
    myFooter,
    rightCard,
    scroll
  },
  provide () {
    return {
      reload: this.reload,
      reMusic: this.reMusic
    }
  },
  methods: {
    ...mapMutations(['changeHasLogin','addUser']),
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
      document.scrollingElement.scrollTop = document.querySelector("#container").offsetTop - 60;
    },
    reMusic(){
      this.musicShow = false
      this.$nextTick(() => {
        this.musicShow = true
      })
    }
  },
  computed:{
    ...mapState(['musicId'])
  },
  async created(){
    let token = localStorage.getItem('jdtoken')      //查看是否有登录的token
    if(token){
      // 查看token是否过期
      let result = await User.checkToken({token})
      if(result.data.meta.status === 1){
        addUserToken(token,this.addUser)
        this.changeHasLogin(1)
      }else{
        localStorage.removeItem('jdtoken')
      }
    }else{
      this.changeHasLogin(0)
    }
  },
  mounted(){
    setTimeout(() => {
      canvasUtil.initFullScreenCanvas()
    }, 2000)
  }
}
</script>
