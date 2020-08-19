class Particle{
  constructor(ctx, x, y){
    this.ctx = ctx
    this.r = 9
    this.x = x
    this.y = y
    this.speedX = Math.random()*4 - 2
    this.speedY = Math.random()*1
    this.startTime = 0 // 开始掉落时间
    this.color = this.getRandomColor()
    this.gy = 0.2 // 自由落体速度控制因素
    this.drawParticles()
  }
  // 画粒子
  drawParticles(){
    let ctx = this.ctx
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(
      this.x,
      this.y,
      this.r, 0, Math.PI * 2
    )
    ctx.closePath()
    ctx.fill()
  }
  update(){
    this.startTime++
    if(this.startTime > 5){
      this.x += this.speedX
      this.speedY += this.gy
      this.y += this.speedY
    }
    if(this.y > 200 && this.r > 0){
      this.r -= 0.5
    }
    this.drawParticles()
  }
  // 生成随机粒子颜色
  getRandomColor(){
    return `rgb(${Math.round( Math.random()*256 )},${Math.round( Math.random()*256 )},${Math.round( Math.random()*256 )})`
  }
}

export default Particle
