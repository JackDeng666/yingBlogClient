<template>
<!-- 右侧上滑小图片 -->
<div :class="gotoTop?'to-top':'to-top go-top'" @click="toTopfun">
  <img :src="'img/scroll.png'"/>
</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      gotoTop: false, //是否要返回顶部
      isGoing: false //是否正在执行上滑动作
    }
  },
  methods: {
    ...mapMutations(['changeIsShowNav']),
    toTopfun(){
      this.gotoTop = false
      this.isGoing = true
      let timer = setInterval(() => {
        let osTop = document.documentElement.scrollTop || document.body.scrollTop      //获取滚动条距离顶部高度
        let speed = Math.floor( - osTop / 10 )                    //滚动速度
        document.documentElement.scrollTop = document.body.scrollTop = osTop + speed
        if (osTop == 0) {                 //到达顶部，清除定时器
          this.isGoing = false
          clearInterval(timer)
          timer = null
        }
      }, 30)
    }
  },
  mounted(){
    let oldTop = 0
    window.onscroll =  () => {
      let top = document.scrollingElement.scrollTop; // 触发滚动条，记录数值
      // 显示隐藏导航栏
      if (oldTop > top) {
        this.changeIsShowNav(1)
      } else {
        this.changeIsShowNav(0)
      }
      // 更新旧的位置
      oldTop = top;

      if(!this.isGoing){
        if(top > 700){
          this.gotoTop = true
        }else{
          this.gotoTop = false
        }
      }
      let rightBox = document.getElementById("right-box")
      if (top >= 575) {
        if(rightBox.classList.value == ""){
          rightBox.classList.add("fixed")
        }
      } else {
        if(rightBox.classList.value != ""){
          rightBox.classList.remove("fixed")
        }
      }
    }
  }
}
</script>

<style scoped>
/*回到顶部*/
/*返回到顶部*/
.to-top {
  position: fixed;
  right: 2rem;
  bottom: 15%;
  width: 4rem;
  transition: all .5s 0.3s ease-in-out;
  cursor: pointer;
}
.to-top img{
  width: 100%;
}
.go-top {
  bottom: 70rem;
}
@media (max-width: 1200px) {
  .to-top {
    display: none;
  }
}
</style>