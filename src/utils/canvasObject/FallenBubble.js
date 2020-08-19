class FallenBubble{
  constructor(ctx, x, y){
    this.ctx = ctx
    this.x = x
    this.y = y
    this.r = 4  // 半径
    this.speedX = this.random(-4, 4)
    this.speedY = this.random(-5, -1)
    this.color = this.getRandomColor()
    this.gy = 0.4 // 自由落体速度控制因素
    this.draw()
  }
  draw(){
    // this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    // this.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false)
    // this.ctx.fill()
    // this.ctx.closePath()
    this.ctx.fillRect(this.x, this.y, this.r, this.r)
    // this.ctx.drawImage(img, this.x, this.y, this.r, this.r)
  }
  fall(){
    this.x += this.speedX
    this.speedY += this.gy
    this.y += this.speedY
    this.draw()
  }
  random(min, max){
    return Math.random()*(max - min) + min
  }
  getRandomColor(){
    return `rgb(${Math.round( Math.random()*155 + 100 )},${Math.round( Math.random()*155 + 100 )},${Math.round( Math.random()*155 + 100 )})`
  }
}

export default FallenBubble
