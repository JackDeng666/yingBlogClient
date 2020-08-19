<template>
<div class="banner-box">
  <ul id="picList" v-show="imgIsLoaded">
    <div class="left"><p>J</p></div>
    <div class="right"><p>D</p></div>
    <canvas id="clockCanvas" height="400" width="1500" :style="isShowClock ? 'opacity: 1;' : 'opacity: 0;'"></canvas>
    <li v-for="(item, i) in liObjects" :key="i" :style="`${item.zindex + item.transition + item.transform}`">
      <img :src="headImgs[0]" :style="`${item.position}`">
      <img :src="headImgs[1]" :style="`${item.position}`">
      <img :src="headImgs[2]" :style="`${item.position}`">
      <img :src="headImgs[3]" :style="`${item.position}`">
      <span></span>
      <span></span>
    </li>
  </ul>
  <div id="bannerbBottom" :style="bannerBottomStyle" v-show="imgIsLoaded">
    <div class="main">
      <div @click="prevMove()">
        <i class="fa fa-backward"></i>
      </div><div @click="isAutoWheel=!isAutoWheel" v-html="isAutoWheel ? '关闭自动轮播' : '开启自动轮播'">
        关闭自动轮播
      </div><div @click="changeSpeed()" v-html="getSpeed()">
        转速：3档
      </div><div @click="isShowClock=!isShowClock" v-html="isShowClock ? '时钟暂时关闭' : '时钟暂时关闭'">
        隐藏时钟
      </div><div @click="nextMove()">
        <i class="fa fa-forward"></i>
      </div>
    </div>
    <div></div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import canvasUtil from '@/utils/canvasObject/CanvasUtil.js'
export default {
  data() {
    return {
      imgLoadedNum: 0,
      imgIsLoaded: false, // 4张图片是否加载完成
      autoWheelTimer: {
        timer: null,
        time: 6000
      },
      isAutoWheel: true, // 是否自动轮播
      isShowClock: true, // 是否展示时钟
      indexSpeed: 0, // 当前banner旋转速度
      speedList: [30, 60, 90], // banner旋转速度列表
      imgId: 0,  // 当前图片
      liObjects: [], // 每个li对象
      bannerBottomStyle: ''
    }
  },
  computed: {
    ...mapState(['headImgs'])
  },
  methods: {
    bannerImgLoaded(imgSrc){
      let img = new Image()
      img.onload = () => {
        this.imgLoadedNum += 1
        if(this.imgLoadedNum >= 4){
          this.imgIsLoaded = true
        }
      }
      img.src = imgSrc
    },
    initLiObject(){
      let liWidth = 32  // 每块li的宽度
      let liNum = Math.round(960 / liWidth) // li的总个数，picList的宽 除以 li的宽
      let zindex = 0 // 解决显示覆盖问题
      this.liObjects = []
      for (let i = 0; i < liNum; i++) {
        i >= liNum / 2 ? zindex-- : zindex++
        this.liObjects.push({
          zindex: `z-index: ${zindex};`,
          position: `object-position: -${i * liWidth}px;`,  // 图片的位置偏移
          transition: `
            transition-delay: ${this.speedList[this.indexSpeed] * i}ms;
            transition-duration: ${this.speedList[this.indexSpeed] * 10}ms;
          `,  // li的旋转延迟
          transform: `transform: rotateX(${90 * this.imgId}deg);` // li的旋转
        })
      }
    },
    nextMove(){
      this.imgId++
      this.imgId > 3 ? this.imgId = 0 : this.imgId = this.imgId
      for(let i = 0; i < this.liObjects.length; i++){
        this.liObjects[i].transform = `transform: rotateX(${90 * this.imgId}deg);`
      }
      this.bannerBottomStyle = `top: 60px; transition-duration: ${this.speedList[this.indexSpeed] * 20}ms;`
      setTimeout(()=> {
        this.bannerBottomStyle = `top: 0; transition-duration: ${this.speedList[this.indexSpeed] * 20}ms;`
      }, this.speedList[this.indexSpeed] * 40)
    },
    prevMove(){
      this.imgId--
      this.imgId < 0 ? this.imgId = 3 : this.imgId = this.imgId
      for(let i = 0; i < this.liObjects.length; i++){
        this.liObjects[i].transform = `transform: rotateX(${90 * this.imgId}deg);`
      }
      this.bannerBottomStyle = `top: 60px; transition-duration: ${this.speedList[this.indexSpeed] * 20}ms;`
      setTimeout(()=> {
        this.bannerBottomStyle = `top: 0; transition-duration: ${this.speedList[this.indexSpeed] * 20}ms;`
      }, this.speedList[this.indexSpeed] * 40)
    },
    startMove(){
      if(this.autoWheelTimer.timer != null){
        clearInterval(this.autoWheelTimer.timer)
      }
      this.autoWheelTimer.timer = setInterval(() => {
        if(this.isAutoWheel){
          this.nextMove()
        }
      }, this.autoWheelTimer.time)
    },
    changeSpeed(){
      this.indexSpeed++
      this.indexSpeed > 2 ? this.indexSpeed = 0 : this.indexSpeed = this.indexSpeed
      this.initLiObject()
      this.autoWheelTimer.time = 6000 + this.indexSpeed * 2000
      this.startMove()
    },
    getSpeed(){
      switch(this.indexSpeed){
        case 0:
          return "转速：3档"
          break;
        case 1:
          return "转速：2档"
          break;
        case 2:
          return "转速：1档"
          break;
      }
    }
  },
  created(){
    // 监听4张图片加载
    this.bannerImgLoaded(this.headImgs[0])
    this.bannerImgLoaded(this.headImgs[1])
    this.bannerImgLoaded(this.headImgs[2])
    this.bannerImgLoaded(this.headImgs[3])
    // 初始化li对象
    this.initLiObject()
    // 定时旋转
    this.startMove()
  },
  mounted(){
    // setTimeout(() => {
    //   canvasUtil.initClockCanvas()
    // }, 2000)
  }
}
</script>

<style scoped>
.banner-box {
  width: 100%;
  height: 500px;
  margin: 70px 0 0 0;
  perspective: 1000px;
}
@media (max-width: 990px) {
  .banner-box {
    display: none;
  }
}
#picList{
  position: relative;
  width: 960px;
  height: 440px;
  margin: 0 auto;
}
#picList li{
  width: 32px;
  height: 440px;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center -220px;
  float: left;
}
/* 4个图 */
#picList li img{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  object-fit: cover;
}
#picList li img:nth-of-type(2){
  top: -440px;
  transform-origin: bottom;
  transform: rotateX(90deg);
}
#picList li img:nth-of-type(3){
  transform: translateZ(-440px) rotateX(180deg);
}
#picList li img:nth-of-type(4){
  top: 440px;
  transform-origin: top;
  transform: rotateX(-90deg);
}
/* 侧面 */
#picList li span{
  position: absolute;
  width: 440px;
  height: 440px;
  background: #444;
}
#picList li span:nth-of-type(1){
  left: 0;
  transform-origin: left;
  transform: rotateY(90deg);
}
#picList li span:nth-of-type(2){
  right: 0;
  transform-origin: right;
  transform: rotateY(-90deg);
}
/* 粒子时钟 */
#picList #neon-clock{
  position: absolute;
  left: 50%;
  top: 85%;
  transform: translate(-50%, -50%);
  z-index: 100;
  transition: 1s;
  font-family: 'Monoton',sans-serif;
  font-size: 70px;
  animation: clock-effect 5s infinite linear;
}
/* 左右两块 */
#picList .left, #picList .right {
  background: #ffffff;
  position: absolute;
  transform-style: preserve-3d;
}
#picList .left {
  left: -75px;
  top: 0;
  animation: leftBlockAnimate 8s linear infinite;
} 
#picList .right {
  right: -75px;
  top: 0;
  animation: rightBlockAnimate 8s linear infinite;
}
@keyframes leftBlockAnimate{
  0%{
    width: 75px;
    height: 490px;
    left: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  10%{
    width: 75px;
    height: 490px;
    left: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  20%{
    width: 75px;
    height: 490px;
    left: -150px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  25%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(0) rotateY(0);
  }
  30%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(0);
  }
  32%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(40deg);
  }
  34%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(30deg);
  }
  36%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(38deg);
  }
  38%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(32deg);
  }
  40%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(35deg);
  }
  50%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(35deg);
  }
  60%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(35deg);
  }
  70%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(-25deg) rotateY(0);
  }
  75%{
    width: 100px;
    height: 100px;
    left: -150px;
    top: 170px;
    transform: rotateZ(0) rotateY(0);
  }
  80%{
    width: 75px;
    height: 490px;
    left: -150px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  90%{
    width: 75px;
    height: 490px;
    left: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  100%{
    width: 75px;
    height: 490px;
    left: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
}
@keyframes rightBlockAnimate{
  0%{
    width: 75px;
    height: 490px;
    right: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  10%{
    width: 75px;
    height: 490px;
    right: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  20%{
    width: 75px;
    height: 490px;
    right: -150px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  25%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(0) rotateY(0);
  }
  30%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(0);
  }
  32%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(-40deg);
  }
  34%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(-30deg);
  }
  36%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(-38deg);
  }
  38%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(-32deg);
  }
  40%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(-35deg);
  }
  50%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(-35deg);
  }
  60%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(-35deg);
  }
  70%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(25deg) rotateY(0);
  }
  75%{
    width: 100px;
    height: 100px;
    right: -150px;
    top: 170px;
    transform: rotateZ(0) rotateY(0);
  }
  80%{
    width: 75px;
    height: 490px;
    right: -150px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  90%{
    width: 75px;
    height: 490px;
    right: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
  100%{
    width: 75px;
    height: 490px;
    right: -75px;
    top: 0;
    transform: rotateZ(0) rotateY(0);
  }
}
#picList .left p, #picList .right p{
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 60px;
  color: white;
  font-family: 'Monoton';
  animation: clock-effect 5s infinite ease-in-out;
  transform: translate(-50%, -50%);
}
/* 下部 */
#bannerbBottom{
  position: relative;
  top: 0;
  left: 0;
  width: 960px;
  height: 50px;
  margin: 0 auto; 
  transform-style: preserve-3d;
  z-index: -1;
}
#bannerbBottom > div{
  position: absolute;
  left: 0;
  top: 0;
}
#bannerbBottom > div:nth-child(1){
  width: 960px;
  height: 50px;
  background: #ffffff;
}
#bannerbBottom > div:nth-child(2){
  width: 960px;
  height: 440px;
  background: #aaaaaa;
  transform-origin: top;
  transform: rotateX(-90deg);
}
/* 底部按钮 */
#bannerbBottom .main{
  text-align: center;
  font-weight: bold;
}
#bannerbBottom .main div{
  display: inline-block;
  width: 100px;
  line-height: 50px;
  border-left: #e9e9e9 solid 1px;
  padding: 0 10px;
  font-size: 16px;
  transition: 1s;
}
#bannerbBottom .main div:hover{
  color: #57a6f0;
  background: #fafafa;
}
#bannerbBottom .main div:active{
  font-size: 14px;
}
#bannerbBottom .main div:nth-child(5){
  border-right: #e9e9e9 solid 1px;
}
#bannerbBottom .main i{
  font-size: 18px;
}
#bannerbBottom .main div:active i{
  font-size: 16px;
}
</style>
