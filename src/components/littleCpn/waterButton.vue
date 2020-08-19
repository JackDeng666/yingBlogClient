<template>
<div :class="isActive?'btn clicked':'btn'">
  {{buttonName}}
  <div class="water"></div>
</div>
</template>

<script>
export default {
  props:['buttonName','isActive']
}
</script>

<style scoped>
.btn{
  display: inline-block;
  border: 1.5px solid #FF0033;
  padding: 6px 22px;
  font-size: 16px;
  cursor: pointer;
  transition: .8s;
  position: relative;
  overflow: hidden;
  color: #FF0033;
  z-index: 1;
  box-sizing: border-box;
  user-select: none;
  font-weight: bold;
}
.btn .water{
  position: absolute;
  left: 0;
  width: 100%;
  height: 0%;
  background: #FF0033;
  z-index: -1;
  transition: .5s;
  bottom: 0;
  box-sizing: border-box;
  border-radius: 50% 50% 0 0;
}
.clicked{
  color: #fff;
}
.clicked .water{
  height: 200%;
}
</style>