<!-- 底部 -->
<template>
<div class="footer">
  <div class="footer-info">
    <p>
      <span class="fa fa-fw fa-heart jump"></span>
      <span> 本站已经建立了{{runTime}}</span>
      <span class="fa fa-fw fa-heart jump"></span>
    </p>
    <p> Copyright 2019-2020 <a href="#">JackDeng</a></p>
    <p>备案号：<a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备19124902号-1</a></p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      runTime: '',
    }
  },
  methods: {
    calTime(){//运行倒计时
      let startTime = new Date('2019/09/17 00:00:00')
      setInterval(() => {
        let nowTime = new Date()
        let runTime = nowTime - startTime
        let days = Math.floor(runTime / 1000 / 60 / 60 / 24 , 10) //计算剩余的天数
        let hours = Math.floor(runTime / 1000 / 60 / 60 % 24 , 10)  //计算剩余的小时
        let minutes = Math.floor(runTime / 1000 / 60 % 60, 10)  //计算剩余的分钟
        let seconds = Math.floor(runTime / 1000 % 60, 10) //计算剩余的秒数
        this.runTime = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒"
      }, 1000)
    }
  },
  created(){
    this.calTime()
  }
}
</script>

<style scoped>
.footer{
  margin-top: 100px;
}
.footer-info{
  width: 100%;
  height: 7rem;
  background: #232323;
  color: #888;
  font-size: 13px;
  text-align: center;
  padding: 15px 10px 10px 10px;
}
.footer-info p{
  margin: 5px 0;
}
.footer-info a{
  position: relative;
  z-index: 1;
  color: rgb(209, 81, 26);
}
.footer-info a:hover{
  color: rgb(250, 91, 23);
}
.jump{
  display: inline-block;
  color: #ff0055;
  animation: jump 5s infinite linear;
}
</style>
