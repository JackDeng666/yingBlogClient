import Particle from './Particle'
import digit from './ClockNum'

class Clock{
  constructor(ctx){
    this.ctx = ctx
    this.ch = this.ctx.canvas.height
    this.cw = this.ctx.canvas.width
    this.r = 9
    this.marginSide = (this.cw - 2 * 7 * (this.r + 2) * 8) / 2 // 侧边间距
    // 保存时间
    this.time = []
    // 保存特效粒子对象
    this.particles = []
  }
  // 画时间，num表示要画的数字，index表示要画在哪个位置
  drawTime(num, index){
    let ctx = this.ctx
    let iLength = digit[num].length
    for (let i = 0; i < iLength; i++) {
      let jLength = digit[num][i].length;
      for (let j = 0; j < jLength; j++) {
        if(digit[num][i][j] == 1){
          ctx.beginPath()
          ctx.fillStyle = "#fff"
          // X index个数字的距离 + 当前x的位置 + 最左边露出一半 + 左右居中偏移
          // Y 当前y的位置 + 最上面露出一半
          ctx.arc(
            2 * 7 * (this.r + 2) * index + j * 2 * (this.r + 1) + (this.r + 1) + this.marginSide,
            i * 2 * (this.r + 1) + (this.r + 1),
            this.r, 0, Math.PI * 2
          )
          ctx.closePath()
          ctx.fill()
        }
      }
    }
  }
  // 画彩色粒子
  drawParticles(particleUpdateNum){
    for (let k = 0; k < particleUpdateNum.length; k++) {
      let iLength = digit[particleUpdateNum[k][0]].length
      for (let i = 0; i < iLength; i++) {
        let jLength = digit[particleUpdateNum[k][0]][i].length
        for (let j = 0; j < jLength; j++) {
          if(digit[particleUpdateNum[k][0]][i][j] == 1){
            // X index个数字的距离 + 当前x的位置 + 最左边露出一半 + 左右居中偏移
            // Y 当前y的位置 + 最上面露出一半
            let x = 14 * (this.r + 2) * particleUpdateNum[k][1] + j * 2 * (this.r + 1) + (this.r + 1) + this.marginSide
            let y = i * 2 * (this.r + 1) + (this.r + 1)
            this.particles.push(new Particle(this.ctx, x, y))
            // 当粒子数量达到一定程度后，删除最前面的粒子，否则越来越卡
            if(this.particles.length > 300){
              this.particles.shift()
            }
          }
        }
      }
    }
  }
  refreshTime(){
    let temp = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date())
    // 需要展现粒子的数字和位置，下标0为数字，下标1为位置
    let particleUpdateNum = []
    if(this.time.length === 0){
      this.time.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6])
    }else{
      let newTime = []
      newTime.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6])
      // 对比哪些数字需要刷新
      for (let i = 0; i < newTime.length; i++) {
        if(this.time[i] != newTime[i]){
          particleUpdateNum.push([newTime[i],i])
        }
      }
      // 清空原数组
      this.time = []
      this.time.push(temp[1],temp[2],10,temp[3],temp[4],10,temp[5],temp[6])
    }
    // 重置，清空画布
    this.ctx.clearRect(0, 0, this.cw, this.ch)
    // 刷新时间
    for (let i = 0; i < this.time.length; i++) {
      this.drawTime(this.time[i],i)
    }
    // 展现粒子特效
    this.drawParticles(particleUpdateNum)
    // 更新所有粒子位置
    let pL = this.particles.length
    for(let i = 0; i < pL; i++){
      this.particles[i].update()
    }
  }
}

export default Clock
