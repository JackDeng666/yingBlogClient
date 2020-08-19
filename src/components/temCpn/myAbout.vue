<!-- 关于我 -->
<template>
<div>
  <div class="myinfo">
    <div class="info-content">
      <div class="img-box">
        <img src="img/comical.png">
      </div>
      <div class="brief-info">
        <ul>
          <h4>个人信息</h4>
          <li>
            <strong>名字：</strong>
            <span>{{ownerBasicInfo.name}}</span>
          </li>
          <li>
            <strong>性别：</strong>
            <span>{{ownerBasicInfo.sex}}</span>
          </li>
          <li>
            <strong>年龄：</strong>
            <span>{{ownerBasicInfo.age}}</span>
          </li>
          <li>
            <strong>职业：</strong><span>{{ownerBasicInfo.profession}}</span>
          </li>
        </ul>
        <ul>
          <h4>其他</h4>
          <li>
            <strong>爱好：</strong><span>{{ownerBasicInfo.hobby}}</span>
          </li>
          <li>
            <strong>邮箱：</strong>
            <span>{{ownerBasicInfo.email}}</span>
          </li> 
          <li>
            <strong>手机号：</strong>
            <span>{{ownerBasicInfo.phoneNumber}}</span>
          </li>
          <li>
            <strong>地址：</strong>
            <span>{{ownerBasicInfo.address}}</span>
          </li>
        </ul>
      </div>
      <span>基本信息</span>
    </div>
    
    <div class="info-content">
      <div class="skill-button">
        <span 
          v-for="(item,i) in ownerSkillInfo" 
          :class="skillStackId == i ? 'active' : ''" 
          :key="i" 
          @click="changeSkillStackId(i)">
          {{item.category}}
        </span>
      </div>
      <span>技能</span>
    </div>

    <div class="info-content">
      <h1>！！！高能慎入！！！</h1>
      <h1>秘档暂时无法查看</h1>
      <img src="img/gif_2.gif">
      <span>秘密档案</span>
    </div>
  </div>
  
</div>
</template>

<script>
import SkillMap from '../../utils/canvasObject/SkillMap.js'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      ownerBasicInfo: null,
      ownerSkillInfo: null,
      colorArrs: [
        [1, 94, 75],
        [183, 121, 36],
        [94, 12, 83]
      ],
      skillStackId: 0,
      skillMap: null
    }
  },
  computed: mapState(['siteInfo']),
  methods: {
    initSkillCanvas(){
      let ctx = document.querySelector("#skillCanvas").getContext("2d")
      // 技能等级名称，由低到高
      let skillLevel = ['D','C','B','A','S','SS']
      this.skillMap = new SkillMap(
        ctx, 
        this.ownerSkillInfo[this.skillStackId].skillInfo, 
        skillLevel, 
        this.colorArrs[this.skillStackId > 2 ? this.randomColor() : this.skillStackId]
      )
      this.skillMap.startSkillAnimate()
    },
    randomColor(){
      return Math.round(Math.random() * 2) // 0~2随机数
    },
    changeSkillStackId(id){
      this.skillStackId = id
      this.skillMap.stopSkillAnimate()
      this.initSkillCanvas()
    }
  },
  mounted(){
    // 根据当前宽度调整canvas宽高
    let width = document.querySelector('.myinfo').getBoundingClientRect().width
    let parent = document.getElementsByClassName("info-content")[1]
    let skillCanvas = document.createElement("canvas")
    skillCanvas.id = "skillCanvas"
    skillCanvas.width = width - 40
    skillCanvas.height = (width - 40) / 4 * 3 + 50
    parent.appendChild(skillCanvas)
    this.initSkillCanvas()
  },
  created(){
    this.ownerBasicInfo = this.siteInfo.ownerInfo.ownerBasicInfo
    this.ownerSkillInfo = this.siteInfo.ownerInfo.ownerSkillInfo
  }
}
</script>

<style scoped>
div {
  text-align: center;
}
.myinfo {
  width: 100%;
  margin: 0 auto;
}
.info-content {
  position: relative;
  width: 100%;
  min-height: 100px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  background: #fff;
  transition: all 0.4s linear;
  margin: 20px 0;
  padding: 20px 20px;
}
.info-content:nth-child(n+2):before{
  content: '';
  position: absolute;
  right: 0;
  top: -20px;
  width: 100px;
  height: 20px;
  border: 1px solid rgba(200, 200, 200, .8);
  background: rgba(254, 254, 254, .6);
  box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
  transform: rotate(-45deg);
}
.info-content:nth-child(1) img {
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  animation: swing .5s linear infinite;
}
.info-content .img-box {
  border-bottom: 1px solid #ddd;
  padding: 20px 0;
  margin: 20px 0;
}
.info-content>span {
  font-size: 13px;
  font-weight: bold;
  color: #fff;
  padding: 0 10px;
  position: absolute;
  left: -15px;
  top: 10px;
  height: 30px;
  line-height: 30px;
  background: #ff0055;
  box-shadow: .5px .5px .5px rgba(102, 102, 102,.4);
}
.info-content>span::before {
  position: absolute;
  content: '';
  bottom: -15px;
  left: 0;
  border-left: 15px solid transparent;
  border-top: 15px solid #b4003c;
  width: 0;
  height: 0;
}
.info-content>span::after {
  content: '';
  position: absolute;
  top: 0;
  right: -30px;
  width: 0px; 
  height: 0px; 
  border-style: solid; 
  border-color: transparent transparent transparent #ff0055; 
  border-width: 15px; 
}
.brief-info {
  display: flex;
  flex-wrap: wrap;
}
.brief-info ul {
  flex: 0 0 335px;
  margin-bottom: 40px;
  text-align: left;
}
.brief-info ul h4 {
  font-size: 22px;
  color: #757575;
  margin: 0 0 20px;
  font-weight: bold;
}
.brief-info ul li {
  font-weight: bold;
  font-size: 14px;
  color: #373737;
  padding: 7px 0;
}
.brief-info strong {
  font-size: 16px;
  display: inline-block;
  width: 70px;
  text-align-last: justify;
}
.brief-info span {
  display: inline-block;
  color: #757575;
}
/* 技能 */
.skill-button{
  width: 90%;
  margin: 0 auto;
}
.skill-button span{
  border: 1px solid grey;
  border-radius: 4px;
  padding: 3px 5px;
  margin: 5px;
  color: gray;
  display:inline-block;
}
.skill-button span:hover{
  border-color: #2780d3;
  color: #fff;
  background: #2780d3;
}
.skill-button span.active{
  border-color: #2780d3;
  color: #fff;
  background: #2780d3;
}
/* 秘密档案 */
h1 {
  font-size: 22px;
  color: #757575;
  margin: 20px 0;
  font-weight: bold;
}
.info-content:nth-child(3) img{
  box-shadow: 0 0 2px #444;
  margin-bottom: 40px;
}
</style>
