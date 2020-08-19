<!-- 留言模块 -->
<template>
<div>
  <div class="water-fall">
    <div class="fall" v-if="messageSet.length>=1">
      <div class="item" v-for="(item,index) in messageSet[0]" :key="index">
        <p>{{item.content}}</p>
        <div>
          <img :src="item.userAvatar?item.userAvatar:defaultImg">
          <div>
            <div class="name"><p>{{item.userNickName}}</p></div>
            <div class="time"><p>{{item.createdTime}}</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="fall" v-if="messageSet.length>=2">
      <div class="item" v-for="(item,index) in messageSet[1]" :key="index">
        <p>{{item.content}}</p>
        <div>
          <img :src="item.userAvatar?item.userAvatar:defaultImg">
          <div>
            <div class="name"><p>{{item.userNickName}}</p></div>
            <div class="time"><p>{{item.createdTime}}</p></div>
          </div>
        </div>
      </div>
    </div>
    <div class="fall" v-if="messageSet.length===3">
      <div class="item" v-for="(item,index) in messageSet[2]" :key="index">
        <p>{{item.content}}</p>
        <div>
          <img :src="item.userAvatar?item.userAvatar:defaultImg">
          <div>
            <div class="name"><p>{{item.userNickName}}</p></div>
            <div class="time"><p>{{item.createdTime}}</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <button @click="getData" v-if="!isLastPage">加载更多</button>
  <button v-if="isLastPage">没有数据了</button>
</div>
</template>

<script>
import { Message } from '@/utils/api'
import moment from 'moment'
import { mapState } from "vuex"
export default {
  data() {
    return {
      // 3列数据
      messageSet:[[],[],[]],
      // 当前高度最小列的id
      shortMessageSetId: 0,
      // 获取到的留言列表
      messageList: [],
      isLastPage: 0,
      currentPage: 0
    }
  },
  watch:{
    'messageSet':'messageSetChange'
  },
  computed: mapState(['defaultImg']),
  methods:{
    messageSetChange(){
      this.$nextTick(()=>{
        let falls = document.getElementsByClassName('fall')
        this.shortMessageSetId = this.getShortFall(falls)
      })
    },
    // 返回当前最小高度的一列id
    getShortFall(falls){
      let shortFallId = 0
      let smallHeight = falls[0].clientHeight
      for(let i = 0;i<falls.length;i++){
        if(smallHeight > falls[i].clientHeight){
          smallHeight = falls[i].clientHeight
          shortFallId = i
        }
        if(i==falls.length-1){
          return shortFallId
        }
      }
    },
    // 填充messageSet数据
    addDataToMessageSet(){
      let maxLength = this.messageList.length
      if(maxLength){
        let i = 0
        let interval = setInterval(() => {
          this.messageSet[this.shortMessageSetId].push(this.messageList.shift())
          i += 1
          if(i===maxLength){
            clearInterval(interval)
          }
        }, 300)
      }
    },
    async getData(){
      this.currentPage += 1
      let result = await Message.getMessageList({currentPage: this.currentPage, pageSize:20})
      let messageData = result.data.data
      this.isLastPage = messageData.isLastPage
      this.messageList = messageData.messageList
      for(let i = 0; i < this.messageList.length; i++){
        this.messageList[i].createdTime = moment(this.messageList[i].createdTime).format('YYYY-MM-DD HH:mm')
      }
      this.addDataToMessageSet()
    }
  },
  created(){
    // 根据屏幕大小，设置数组长度，让fall是否显示
    let sreenWidth = document.body.clientWidth
    if(sreenWidth <= 480){
      this.messageSet.length = 1
    }else if(sreenWidth <= 768){
      this.messageSet.length = 2
    }else{
      this.messageSet.length = 3
    }
    this.getData()
  }
}
</script>

<style scoped>
.water-fall{
  display: flex;
  align-items: flex-start;
}
.fall{
  flex: 1;
  margin: 0 8px;
}
.item {
  position: relative;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.15);
  border-radius: 5px;
  margin: 0 0 16px 0;
  animation: show .5s;
  cursor: pointer;
  transition: .3s;
}
.item:hover {
  transform: translate(0,-4px);
}
.item:hover img{
  /* animation: swing .5s linear infinite; */
}
.item>div{
  background: #f1f8f8;
  border-top: 1px solid #efefef;
  text-align: center;
  padding: 5px;
  transition: .3s;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.item>div>div{
  display: inline-block;
  vertical-align:middle;
  text-align: center;
}
.item div>p{
  background: #fff;
  border: 1px solid #ddd;
  padding: 1px 4px;
  margin: 2px 0;
}
.item .name p{
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  color: #fa4b8b;
}
.item .time p{
  display: inline-block;
  font-size: 10px;
  color: #91bef0;
}
.item>p{
  word-break:break-all;
  font-size: 18px;
  color: #00a1d6;
  padding: 8px;
  transition: .3s;
}
@keyframes show {
  0%{
    transform: scale(0);
    opacity: 0;
  }
  100%{
    transform: scale(1);
    opacity: 1;
  }
}
.item img{
  vertical-align:middle;
  width: 45px;
  height: 45px;
  background: #fff;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
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
