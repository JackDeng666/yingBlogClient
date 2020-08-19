<template>
  <div>
    <!-- 评论列表 -->
    <div v-if="commentList!=null&&commentList.length>0">
      <div v-for="(item,index) in commentList" :key="index">
        <div class="commentItem">
          <!-- 左侧头像 -->
          <div class="left">
            <img v-if="item.avatar" :src="item.avatar"/>
            <img v-else src="img/comical.png"/>
          </div>
          <!-- 右侧内容 -->
          <div class="right">
            <!-- 用户姓名，评论时间 -->
            <p>
              <span class="name">{{item.nick_name}}</span>
              <span class="time">{{item.created_time}}</span>
              <span class="reply-btn" @click="ReplyClick(item.id, item.nick_name)">回复</span>
            </p>
            <!-- 评论内容 -->
            <div class="comment-content">
              {{item.content}}
            </div>
          </div>
        </div>
        <div style="padding-left:40px;">
          <comment-item @PostReply="ReplyClick" :commentChild="item.replies"></comment-item>
        </div>
      </div>
    </div>
    <div v-else style="text-align:center;">
      ~~~暂无评论，赶紧占一条~~~~
    </div>
  </div>
</template>

<script>
import commentItem from "./commentItem"
import { Comment } from "@/utils/api"
import { initDate } from "@/utils/common"

export default {
  components: {
    commentItem
  },
  data() {
    return {
      commentList: null
    }
  },
  methods: {
    changeCommentData(data) {
      function fn(temp) {
        let arr = []
        for (let i = 0; i < data.length; i++) {
          data[i].created_time = initDate(data[i].created_time,"all")
          if (data[i].reply_to == temp) {
            arr.push(data[i])
            data[i].replies = fn(data[i].id)
          }
        }
        return arr
      }
      return fn(null)
    },
    ReplyClick(id, nick_name) {
      this.$emit("ReplyClick", id, nick_name)
    }
  },
  async created() {
    let res = await Comment.getCommentListByBlogId({blogId: this.$route.query.blogId})
    this.commentList = this.changeCommentData(res.data.data.commentList)
    console.log(res)
    console.log(this.commentList)
  }
}
</script>

<style>
.commentItem{
  display: flex;
  flex-wrap: wrap;
}
.commentItem > div:nth-child(3){
  flex-basis: 100%;
}
.commentItem .left {
  margin-right: 5px;
}
.commentItem .left img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
.commentItem .right {
  flex: 1;
  position: relative;
  padding: 2px;
  margin: 5px 0;
  border-bottom: 1px solid #eee;
}
.commentItem .right > p {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}
.commentItem .right > p > span{
  background: #fff;
  border: 1px solid #ddd;
  padding: 1px 4px;
}
.commentItem .right > p > .name{
  margin-right: 10px;
  color: #fa4b8b;
}
.commentItem .right > p > .time{
  margin-right: 10px;
  color: #91bef0;
}
.commentItem .right > p > .reply-btn{
  cursor: pointer;
  color: #bbb;
}
.commentItem .right > p > .reply-btn:hover{
  background: #ebebeb;
  color: #1887e2;
}
</style>