<!-- 监控路由组件 -->
<template>
  <div class="watch-route">
    <img :src="routeImg ? routeImg : rightCardAnimateImg[0]"/>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
export default{
  data(){
    return{
      routeImg: ''
    }
  },
  computed: mapState(['rightCardAnimateImg']),
  watch:{
    '$route':'routeChange'
  },
  inject: ['reload'],
  methods:{
    routeChange(){
      switch(this.$route.name){
        case 'home':
          this.routeImg = this.rightCardAnimateImg[0]
          break
        case 'bloglist':
          this.routeImg = this.rightCardAnimateImg[3]
          this.reload()
          break
        case 'blogdetail':
          this.routeImg = this.rightCardAnimateImg[2]
          this.reload()
          break
        case 'messageboard':
          this.routeImg = this.rightCardAnimateImg[1]
          break
        case 'aboutme':
          this.routeImg = this.rightCardAnimateImg[0]
          break
        case 'logorsign':
          this.routeImg = this.rightCardAnimateImg[3]
          break
        default:
          this.routeImg = this.rightCardAnimateImg[0]
          break
      }
    }
  }
}
</script>

<style scoped>
.watch-route {
  height: 150px;
  position: relative; 
  margin:0 auto
}
.watch-route img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  min-height: 70px;
  max-height: 110px;
}
</style>
