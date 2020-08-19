<template>
  <div>
    <div class="catch-me">
      <div>
        <a href="img/JDqq.jpg" target="_blank"><i class="fa fa-fw fa-qq"></i></a>
        <a href="img/JDwechat.png" target="_blank"><i class="fa fa-fw fa-wechat"></i></a>
      </div>
      <div>
        <a href="https://github.com/JackDeng666" target="_blank"><i class="fa fa-fw fa-github"></i></a>
        <a><i class="fa fa-fw fa-file-word-o"></i></a>
        <a><i class="el-icon-more"></i></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'callMe'
}
</script>

<style scoped>
div a {
  outline: none;
}
.catch-me {
  margin: 8px 0;
  text-align: center;
}
.catch-me a {
  display: inline-block;
  /* margin-bottom: 7px; */
  position: relative;
  text-decoration: none;
}
.catch-me a:hover i {
  color: #fff;
  background: #f4692c;
}
.catch-me a i {
  display: inline-block;
  font-size: 18px;
  width: 42px;
  height: 42px;
  line-height: 42px;
  border-radius: 42px;
  color: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  font-style: normal;
  margin: 0 3.2px;
}
</style>