import FallenBubble from './FallenBubble'
import Clock from './Clock'
const bubbles = []

class CanvasUtil {
  // 启动全屏点击canvas特效
  initFullScreenCanvas(){
    let fullScreenCanvas = document.querySelector("#fullScreenCanvas")
    let fullScreenCanvasCtx = fullScreenCanvas.getContext("2d")
    let fullScreenCanvasWidth = fullScreenCanvas.width = window.innerWidth
    let fullScreenCanvasHeight = fullScreenCanvas.height = window.innerHeight

    function bubbleAdd(x, y){
      for (let i = 0; i < 10; i++) {
        bubbles.push(new FallenBubble(fullScreenCanvasCtx, x, y))
      }
    }
    requestAnimationFrame(function animationLoop(){
      fullScreenCanvasCtx.clearRect(0, 0, fullScreenCanvasWidth, fullScreenCanvasHeight)
      for(let bubble of bubbles) {
        bubble.fall()
        if(bubble.y > fullScreenCanvasHeight){
          bubbles.shift()
        }
      }
      requestAnimationFrame(animationLoop) 
    })
    document.querySelector('body').addEventListener("mousedown", (event) => {
      bubbleAdd(event.x, event.y)
    })
  }
  // 启动粒子时钟canvas
  initClockCanvas(){
    let clockCanvasCtx = document.querySelector("#clockCanvas").getContext("2d")
    let clock = new Clock(clockCanvasCtx)
    requestAnimationFrame(function clockAnimationLoop(){
      clock.refreshTime()
      requestAnimationFrame(clockAnimationLoop) 
    })
  }
  hideCanvas(){
    document.querySelector("#fullScreenCanvas").style.opacity = 0
  }
  showCanvas(){
    document.querySelector("#fullScreenCanvas").style.opacity = 1
  }
}

export default new CanvasUtil()
