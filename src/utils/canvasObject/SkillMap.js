// 深拷贝
function objDeepCopy(source) {
  // 判断是数组还是对象
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    // 只要不是基本类型都要再进行一层递归
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item]
  }
  return sourceCopy
}
// 思路：
// 根据技能数据长度N，2π / N，得出每块弧度，自己确定边长，利用三角函数，以中点x0,y0为中心，确定N个点
class SkillMap{
  constructor(ctx, skillData, skillLevel, colorArr){
    this.ctx = ctx
    this.ch = this.ctx.canvas.height
    this.cw = this.ctx.canvas.width
    this.x0 = this.cw / 2
    this.y0 = this.ch / 2
    // 技能信息
    this.skillData = objDeepCopy(skillData)
    this.skillLevel = skillLevel
    this.maxSkill = []
    // N维图信息
    this.maxSideLength = this.cw / 3 // 最大边长
    this.colorArr = colorArr
    this.color = `rgb(${this.colorArr[0]},${this.colorArr[1]},${this.colorArr[2]})`
    this.angle = Math.PI * 2 / this.skillData.length  // 每块弧度
    this.startAngle = Math.PI / 6 // 起始弧度
    this.titleMargin = 10 // 技能描述距图间距
    this.titleSize = this.cw / 40 // 字体大小

    this.globalID = null  // requestAnimationFrame的ID

    this.backgroundData = null // 不变的背景保存
    
    this.drawMap()
    this.drawMiddleLineAndTitle()
  }
  // 画出中间等级块
  drawMap(){
    let transparency = 1 / (this.skillLevel.length + 2)
    let length = this.maxSideLength / this.skillLevel.length
    let opacity = transparency
    let sideLength = this.maxSideLength
    for (let i = 0; i < this.skillLevel.length; i++) {
      this.drawBlock(sideLength, `rgba(${this.colorArr[0]}, ${this.colorArr[1]}, ${this.colorArr[2]}, ${opacity})`)
      sideLength -= length
      opacity += transparency
    }
  }
  // 画每一块
  drawBlock(sideLength, fillColor){
    this.ctx.beginPath()
    let nowAngle = this.startAngle
    // 求出每个点
    for (let i = 0; i < this.skillData.length; i++) {
      let edgeX = Math.cos(nowAngle) * sideLength
      let edgeY = Math.sin(nowAngle) * sideLength
      if(i == 0){
        this.ctx.moveTo(this.x0 + edgeX, this.y0 + edgeY)
      }else{
        this.ctx.lineTo(this.x0 + edgeX, this.y0 + edgeY)
      }
      nowAngle += this.angle
    }
    this.ctx.strokeStyle = this.color
    this.ctx.lineWidth = 0.2
    this.ctx.fillStyle = fillColor
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
  }
  // 画中间白线和标题
  drawMiddleLineAndTitle(){
    let nowAngle = this.startAngle
    let edgeX
    let edgeY
    for (let i = 0; i < this.skillData.length; i++) {
      edgeX = Math.cos(nowAngle) * (this.maxSideLength + this.titleMargin)
      edgeY = Math.sin(nowAngle) * (this.maxSideLength + this.titleMargin)
      let outX = this.x0 + edgeX
      let outY = this.y0 + edgeY

      this.ctx.font = `bold ${this.titleSize}px sans-serif`
      
      // 算出字宽高
      let fontWidth = this.ctx.measureText(this.skillData[i].skillName).width

      this.ctx.beginPath()
      this.ctx.moveTo(this.x0, this.y0)
      this.ctx.lineTo(outX, outY)

      if(outX > this.x0){
        this.ctx.textAlign = "left"
        // this.ctx.lineWidth = 1
        // this.ctx.beginPath()
        // this.ctx.moveTo(this.x0 + Math.cos(nowAngle) * this.maxSideLength, this.y0 + Math.sin(nowAngle) * this.maxSideLength)
        // this.ctx.lineTo(outX, outY)
        // this.ctx.lineTo(outX + fontWidth, outY)
        // this.ctx.stroke()
        // this.ctx.closePath()
        this.ctx.lineTo(outX + fontWidth, outY)
      }else{
        this.ctx.textAlign = "right"
        // this.ctx.lineWidth = 1
        // this.ctx.beginPath()
        // this.ctx.moveTo(this.x0 + Math.cos(nowAngle) * this.maxSideLength, this.y0 + Math.sin(nowAngle) * this.maxSideLength)
        // this.ctx.lineTo(outX, outY)
        // this.ctx.lineTo(outX - fontWidth, outY)
        // this.ctx.stroke()
        // this.ctx.closePath()
        this.ctx.lineTo(outX - fontWidth, outY)
      }
      if(outY > this.y0){
        this.ctx.textBaseline = "hanging"
      }else{
        this.ctx.textBaseline = "bottom"
      }
      this.ctx.strokeStyle = this.color
      this.ctx.lineWidth = 1.5
      this.ctx.stroke()
      this.ctx.closePath()

      this.ctx.fillStyle = this.color
      this.ctx.fillText(this.skillData[i].skillName, outX, outY)
      
      nowAngle += this.angle
    }
    this.backgroundData = this.ctx.getImageData(0, 0, this.cw, this.ch)
  }
  // 画技能进度
  drawSkillProgress(){
    this.ctx.beginPath()
    let edges = []
    this.skillData.forEach(data => {
      edges.push(data.skillProgress / 100 * this.maxSideLength)
    })
    let nowAngle = this.startAngle + this.angle
    this.ctx.moveTo(this.x0 + Math.cos(this.startAngle) * edges[0], this.y0 + Math.sin(this.startAngle) * edges[0])
    this.drawLevel(this.skillData[0].skillProgress, this.x0 + Math.cos(this.startAngle) * edges[0], this.y0 + Math.sin(this.startAngle) * edges[0])
    // 求出每个点
    for (let i = 1; i <= this.skillData.length; i++) {
      if(i == this.skillData.length){ // 连接初始点
        this.ctx.lineTo(this.x0 + Math.cos(this.startAngle) * edges[0], this.y0 + Math.sin(this.startAngle) * edges[0])
      }else{
        let edgeX = Math.cos(nowAngle) * edges[i]
        let edgeY = Math.sin(nowAngle) * edges[i]
        this.ctx.lineTo(this.x0 + edgeX, this.y0 + edgeY)
        this.drawLevel(this.skillData[i].skillProgress, this.x0 + edgeX, this.y0 + edgeY)
      }
      nowAngle += this.angle
    }
    this.ctx.strokeStyle = "red"
    this.ctx.lineWidth = 3
    this.ctx.fillStyle = "rgba(255, 0, 0, .5)"
    this.ctx.closePath()
    this.ctx.stroke()
    this.ctx.fill()
  }
  // 画等级
  drawLevel(skillProgress, x, y){
    if(x > this.x0){
      this.ctx.textAlign = "left"
      x += 5
    }else{
      this.ctx.textAlign = "right"
      x -= 5
    }
    if(y > this.y0){
      this.ctx.textBaseline = "top"
      y += 5
    }else{
      this.ctx.textBaseline = "bottom"
      y -= 5
    }
    this.ctx.font = `italic bold ${this.titleSize + 3}px sans-serif`
    this.ctx.fillStyle = "rgba(255, 0, 0, 1)"
    this.ctx.fillText(this.findLevel(skillProgress), x, y)
  }
  // 根据skillProgress查找技能进度对应的等级
  findLevel(skillProgress){
    let num = 100 / this.skillLevel.length
    for (let i = 0; i < this.skillLevel.length; i++) {
      if(i * num <= skillProgress && skillProgress < (i + 1) * num){
        return this.skillLevel[i]
      }
    }
    return "SSS"
  }
  // 技能进度更新
  skillUpdate(){
    let num = 0
    for (let i = 0; i < this.skillData.length; i++) {
      if(this.skillData[i].skillProgress < this.maxSkill[i]){
        this.skillData[i].skillProgress += 0.4
        num += 1
      }
    }
    // 全部加载完成取消执行动画
    if(num == 0){
      cancelAnimationFrame(this.globalID)
    }
  }
  // 技能进度动画
  startSkillAnimate(){
    for (let i = 0; i < this.skillData.length; i++) {
      this.maxSkill.push(this.skillData[i].skillProgress)
      this.skillData[i].skillProgress = 0
    }
    let that = this
    // 使用js动画函数执行进度条范围扩大
    function animate(){
      that.globalID = requestAnimationFrame(animate)
      that.skillUpdate()
      that.ctx.clearRect(0, 0, that.cw, that.ch)
      that.ctx.putImageData(that.backgroundData, 0, 0)
      that.drawSkillProgress()
    }
    that.globalID = requestAnimationFrame(animate)
  }
  stopSkillAnimate(){
    this.ctx.clearRect(0, 0, this.cw, this.ch)  
    cancelAnimationFrame(this.globalID)
  }
}

export default SkillMap
