<template>
  <div>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <slot></slot>
  </div>
</template>

<style scoped>
div{
  position: relative;
  color: #fff;
  padding: 10px 30px;
  font-size: 20px;
  box-shadow: 0 10px 50px rgba(0,0,0,.3);
  background: rgba(14, 187, 240, 0.5);
  /* background: rgba(255, 255, 255, 0.8); */
  overflow: hidden;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  display: inline-block;
}
div span:nth-child(1){
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to right,rgba(14, 187, 240, 0.5),rgba(0, 119, 255, 1));
  animation: animate1 linear 2s infinite;
}
@keyframes animate1{
  0%{
    transform: translateX(-100%);
  }
  100%{
    transform: translateX(100%);
  }
}
div span:nth-child(2){
  position: absolute;
  top: 0;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to bottom,rgba(14, 187, 240, 0.5),rgba(3, 132, 253, 1));
  animation: animate2 linear 2s infinite;
  animation-delay: 1s;
}
@keyframes animate2{
  0%{
    transform: translateY(-100%);
  }
  100%{
    transform: translateY(100%);
  }
}
div span:nth-child(3){
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(to left,rgba(14, 187, 240, 0.5),rgba(255, 0, 0, 1));
  animation: animate3 linear 2s infinite;
}
@keyframes animate3{
  0%{
    transform: translateX(100%);
  }
  100%{
    transform: translateX(-100%);
  }
}
div span:nth-child(4){
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(to top,rgba(14, 187, 240, 0.5),rgba(255, 13, 106, 1));
  animation: animate4 linear 2s infinite;
  animation-delay: 1s;
}
@keyframes animate4{
  0%{
    transform: translateY(100%);
  }
  100%{
    transform: translateY(-100%);
  }
}
</style>