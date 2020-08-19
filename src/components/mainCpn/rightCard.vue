<!-- 右侧固定导航栏 -->
<template>
  <div id="right-box">
    <!-- 白色卡片 -->
    <div class="right-card">
      <div class="right-card-head">
        <img :src="rightCardImg" alt/>
        <h1>I'm JD</h1>
      </div>
      
      <div class="right-card-tab">
        <ul>
          <li :class="{active:activeIndex===0}" @click="activeIndex=0">Animate</li>
          <li :class="{active:activeIndex===1}" @click="activeIndex=1">联系我</li>
          <li :class="{active:activeIndex===2}" @click="activeIndex=2">歌单切换</li>
        </ul>
        <div class="tab-content">
          <watchRoute v-show="activeIndex===0"></watchRoute>
          <callMe v-show="activeIndex===1"></callMe>
          <musicChange v-show="activeIndex===2"></musicChange>
        </div>
      </div>

      <div class="site-info">站点被浏览了<p>{{browedCount}}</p>次</div>

    </div>

    <!-- 蛇皮按钮 -->
    <snakingButton class="snake">
      <i :class="isLiked?'fa fa-fw fa-heart jump-fast':'fa fa-fw fa-heart jump-slow'"
        @click="likeFun"></i> 
      {{likedCount}}
    </snakingButton>

  </div>
</template>

<script>
import { Statistics } from '@/utils/api'
import { mapState,mapMutations } from 'vuex'
import watchRoute from '@/components/rightCardCpn/watchRoute'
const callMe = () => import('@/components/rightCardCpn/callMe')
const musicChange = () => import('@/components/rightCardCpn/musicChange')
const snakingButton = () => import('@/components/littleCpn/snakingButton')

export default {
  data() {
    return {
      activeIndex: 0,
      browedCount: 0,
      likedCount: 0,
      isLiked: false,
    }
  },
  components:{
    watchRoute,
    callMe,
    musicChange,
    snakingButton
  },
  computed: mapState(['rightCardIsFixed','rightCardImg']),
  methods:{
    ...mapMutations(['setSiteInfo']),
    async likeFun(){
      if(!this.isLiked){
        let result = await Statistics.addLikedCount()
        if(result.data.meta.status === 1){
          this.likedCount += 1
          this.isLiked = true
          setTimeout(() => {
            this.isLiked = false
          }, 1000*60)
        }
      }
    },
    async browedFun(){
      // 判断站点是否在本次打开网页浏览过
      if(!sessionStorage.getItem('jdsite')){
        let result = await Statistics.addBrowsedCount()
        if(result.data.meta.status === 1){
          sessionStorage.setItem('jdsite', 1)
          this.browedCount += 1
        }
      }
    }
  },
  async mounted(){
    let result = await Statistics.getSiteInfo()
    this.setSiteInfo(result.data.data.siteInfo)
    this.browedCount = result.data.data.siteInfo.mainInfo.allBrowsedCount
    this.likedCount = result.data.data.siteInfo.mainInfo.allLikedCount
    this.browedFun()
  }
}
</script>

<style scoped>
#right-box .right-card {
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.right-card-head {
  text-align: center;
  border-radius: 4px 4px 0 0;
  position: relative;
}
.right-card-head img {
  width: 100%;
  margin-bottom: 10px;
}
.right-card-head h1 {
  position: absolute;
  bottom: 5px;
  margin: 0 0 0 -65px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  font-weight: 700;
  width: 130px;
  left: 50%;
}
/* fixed */
#right-box {
  width: auto;
}
#right-box.fixed {
  position: fixed;
  top: 55px;
  width: 306.666px;
}
@media (max-width: 1120px) {
  #right-box.fixed {
    width: auto;
  }
}
@media (max-width: 991px) {
  #right-box {
    margin: 30px auto 0 auto;
    width: 306.66px;
  }
  #right-box.fixed {
    position: relative;
    top: 0;
    width: 306.66px;
    margin: 30px auto 0 auto;
  }
}
/* tab */
.right-card-tab>ul{
  display: flex;
}
.right-card-tab>ul>li{
  flex: 1;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  margin-bottom: -.5px;
}
.right-card-tab>ul>li.active{
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: 1px solid #e1e1e1;
  border-bottom-color: #fff;
  color: #e91e63;
}
.right-card-tab>div{
  border: 1px solid #e1e1e1;
}
.tab-content{
  max-height: 200px;
  overflow-y: scroll;
}
.tab-content::-webkit-scrollbar {
  /* width: 4px; */
  display: none;
}
/* 站点统计信息 */
.site-info{
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: gray;
}
.site-info p{
  display: inline;
  font-size: 16px;
  color: #3498db;
}
/* likeFun */
.snake{
  font-size: 24px;
  color: #f83576;
}
.snake i {
  font-size: 20px;
}
/*跳动*/
.jump-fast{
  animation: jump 1s infinite ease-in-out;
  color: #ff0055;
}
.jump-slow{
  animation: jump 5s infinite ease-in-out;
}
</style>
