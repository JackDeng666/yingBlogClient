<template>
<div class="common-box">
  <el-collapse v-model="activeNames">
    <el-collapse-item title="发表留言">
      <textarea
        placeholder="说点什么呢``"
        v-model="sendForm.content">
      </textarea>
      <button @click="sendFun">发送</button>
    </el-collapse-item>
  </el-collapse>
  <button @click="reload">刷新留言</button>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Message } from '@/utils/api'
export default {
  data() {
    return {
      activeNames: ['1'],
      sendForm: {
        content:''
      }
    }
  },
  computed: {
    ...mapState(['userInfo','hasLogin','canSend'])
  },
  inject: ['reload'],
  methods: {
    ...mapMutations(['changeCanSend']),
    async sendFun(){
      if(this.hasLogin){
        if(this.contentValidate()&&this.isCanSend()){
          this.sendForm.userId = this.userInfo.id
          let result = await Message.addMessage(this.sendForm)
          if(result.data.meta.status === 1){
            this.$message.success('发送成功')
            this.sendForm.content = ''
            this.changeCanSend(false)
            setTimeout(() => {
              this.changeCanSend(true)
            }, 1000*60)
            this.reload()
          }else{
            this.$message.error(result.data.meta.msg)
          }
        }
      }else{
        this.$message.warning('请先登录')
      }
    },
    isCanSend(){
      if(this.canSend){
        return true
      }else{
        this.$message.warning('请1分钟后再发送')
        return false
      }
    },
    // 内容验证
    contentValidate(){
      if(this.sendForm.content.length < 6 || this.sendForm.content.length > 255){
        this.$message.warning('内容太少或太多了')
        return false
      }else{
        return true
      }
    }
  }
}
</script>

<style scoped>
.common-box{
  margin-bottom: 40px;
}
h1{
  color: #444;
  font-weight: 700;
  font-size: 16px;
}
textarea{
  display: block;
  outline: none;
  box-sizing: border-box;
  width: 100%;
  height: 80px;
  margin: 10px 0;
  padding: 10px 10px;
  border: 1px solid #ddd;
}
button{
  border: 0;
  outline: none;
  margin: 0.5rem auto;
  width: 100%;
  height: 2rem;
  border-radius: 0.2rem;
  background: #91bef0;
  color: #fff;
  font-size: 1rem;
  transition: .3s;
  cursor: pointer;
}
button:hover{
  background: #f8b4c9;
}
</style>
